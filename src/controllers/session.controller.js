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
        cart: req.user.cart,
      };
      req.session.login = true;
      req.logger.info(
        `Sesión iniciada el ${new Date().toLocaleString()} del user ${
          req.user.email
        }`
      );
      res.redirect("/current");
    } catch (error) {
      req.logger.error(
        `Tuvimos un error al intentar iniciar la sesion del user  ${req.user.email}`
      );
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async failLogin(req, res) {
    try {
      req.logger.warning(
        `No pudimos iniciar la sesion el ${new Date().toLocaleString()}`
      );
      res.send({ error: "Error en login, vuelva al inicio" });
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
      req.logger.info(
        `Sesión iniciada el ${new Date().toLocaleString()} del user ${req.user}`
      );
      res.redirect("/api/users/profile");
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = SessionController;
