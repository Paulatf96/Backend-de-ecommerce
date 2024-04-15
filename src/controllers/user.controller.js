const UserModel = require("../models/user.model.js");

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

      res.redirect("/userProducst");
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
}

module.exports = UserController;
