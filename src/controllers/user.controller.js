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
      console.log("Ha ocurrido un error", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async failRegister(req, res) {
    try {
      res.send({ error: "Registro fallido" });
    } catch (error) {
      console.log("Ha ocurrido un error", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async profile(req, res) {
    const userDto = new UserDTO(
      req.user.first_name,
      req.user.last_name,
      req.user.role
    );
    const isAdmin = req.user.role === "admin";

    res.render("profile", { user: userDto, isAdmin });
  }
}

module.exports = UserController;
