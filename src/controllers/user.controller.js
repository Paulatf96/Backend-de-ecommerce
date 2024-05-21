const UserModel = require("../models/user.model.js");
const UserDTO = require("../dto/user.dto.js");
const transport = require("../config/transport.config.js");
const { generarResetToken } = require("../utils/tokenreset.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");

class UserController {
  async loguin(req, res) {
    try {
      if (!req.user) return res.status(400).send({ status: "error" });

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol,
      };

      req.session.login = true;

      res.redirect("/api/users/profile");
    } catch (error) {
      req.logger.error("Ha ocurrido un error en el login", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async failRegister(req, res) {
    try {
      req.logger.warning(
        `No pudimos realizar el registro de ${
          req.user.email
        } el -- ${new Date().toLocaleString()}`
      );
      res.send({ error: "Registro fallido" });
    } catch (error) {
      req.logger.error("Ha ocurrido un error en el registro", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async profile(req, res) {
    const userDto = new UserDTO(
      req.user.first_name,
      req.user.last_name,
      req.user.rol
    );

    const isAdmin = req.user.rol == "admin";
    res.render("profile", { user: userDto, isAdmin });
  }
  async password(req, res) {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const token = generarResetToken();
      user.resetToken = {
        token: token,
        expire: new Date(Date.now() + 3600000), // 1 Hora de duración.
      };
      await user.save();
      let result = await transport.sendMail({
        from: "Atenea Ecommerce <paula.tf96@gmail.com>",
        to: email,
        subject: "Recuperación de contraseña",
        html: `
        <p> ¡Hola! Solicitaste una nueva contraseña</p>
        <strong> ${token} </strong>
        <p> Este código expira en una hora </p>
        <a href="http://localhost:8080/password"> Restablecer Contraseña </a>
  
        `,
        attachments: [],
      });
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  }

  async resetPassword(req, res) {
    const { password, email, token } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.render("changepassword", { error: "Usuario no encontrado" });
      }

      const resetToken = user.resetToken;
      if (!resetToken || resetToken.token !== token) {
        return res.render("changepassword", {
          error: "El token de restablecimiento de contraseña es invalido",
        });
      }

      const ahora = new Date();
      if (ahora > resetToken.expire) {
        return res.render("changepassword", {
          error: "El token de restablecimiento de contraseña es invalido",
        });
      }

      if (isValidPassword(password, user)) {
        return res.render("changepassword", {
          error: "La nueva contraseña no puede ser igual a la anterior",
        });
      }

      user.password = createHash(password);
      user.resetToken = undefined;
      await user.save();

      return res.redirect("/login");
    } catch (error) {
      return res
        .status(500)
        .render("changepassword", { error: "Error interno del servidor" });
    }
  }
}

module.exports = UserController;
