const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("register", {failureRedirect: "/api/users/failedregister"}),
  async (req, res) => {
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
  }
);

router.get("/failedregister", (req, res) => {
  res.send({ error: "Registro fallido" });
});

module.exports = router;
