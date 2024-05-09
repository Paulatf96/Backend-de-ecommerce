const UserModel = require("../models/user.model.js");
const UserDTO = require("../dto/user.dto.js");

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
}

module.exports = UserController;
