const UserModel = require("../models/user.model.js");
const UserDTO = require("../dto/user.dto.js");
const UserRepository = require("../repositories/user.repository.js");
const userRepository = new UserRepository();
const EmailManager = require("../services/email.js");
const emailManager = new EmailManager();
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
        lastConnection: req.user.lastConnecction,
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
    console.log(req.user);
    const userDto = new UserDTO(
      req.user.first_name,
      req.user.last_name,
      req.user.rol,
      req.user.email,
      req.user.lastConnecction,
      req.user._id
    );

    const isAdmin = req.user.rol == "admin";
    const isPremium = req.user.rol == "premium";
    res.render("profile", { user: userDto, isAdmin, isPremium });
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

      await emailManager.sendResetEmail(email, token);

      res.redirect("/confirmationPassword");
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

      const now = new Date();
      if (now > resetToken.expire) {
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

  async changeRolPremium(req, res) {
    const { uid } = req.params;
    try {
      const user = await UserModel.findById(uid);

      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const nuevoRol = user.rol === "user" ? "premium" : "user";

      const actualizado = await UserModel.findByIdAndUpdate(uid, {
        rol: nuevoRol,
      });
      res.json(actualizado);
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  }
  async getUsers(req, res) {
    try {
      const users = await UserModel.find();
      if (!users) {
        return res.status(404).send("Sin usuarios");
      }
      const userDTOs = users.map(
        (user) =>
          new UserDTO(
            user.first_name,
            user.last_name,
            user.rol,
            user.email,
            user.lastConnection,
            user._id
          )
      );
      res.render("users", { users: userDTOs });
    } catch (error) {
      res.status(500).send("Error interno del servidor");
    }
  }

  async deleteInactiveUsers(req, res) {
    try {
      const users = await userRepository.deleteInactiveUsers();
      if (!users) {
        return res.status(404).send("Sin usuarios");
      }

      for (const user of users) {
        await emailManager.sendEmailInactiveAccount(
          user.email,
          user.first_name
        );
      }
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    const { uid } = req.params;
    try {
      const deletedUser = await userRepository.delete(uid);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = UserController;
