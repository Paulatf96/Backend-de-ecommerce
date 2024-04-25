class SessionController {
  async createSession(req, res) {
    try {
      if (!req.user) return res.status(400).send({ status: "error" });

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol,
        cart: req.user.cart
      };

      req.session.login = true;

      res.redirect("/api/users/profile");
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async failLogin(req, res) {
    try {
      res.send({ error: "Error en login" });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async logout(req, res) {
    try {
      if (req.session.login) {
        req.session.destroy();
      }
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async githubcallback(req, res) {
    try {
      req.session.user = req.user;
      req.session.login = true;
      res.redirect("/api/users/profile");
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = SessionController;
