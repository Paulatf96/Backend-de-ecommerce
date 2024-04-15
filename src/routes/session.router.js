const express = require("express");
const router = express.Router();
const passport = require("passport");
const SessionController = require("../controllers/session.controller.js");
const sessionController = new SessionController();

const EMAIL_ADMIN = "adminCoder@coder.com";
const PASSWORD_ADMIN = "adminCod3r123";

// router.post(
//   "/login",
//   passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin",}),
//   async (req, res) => {
//     if (!req.user) return res.status(400).send({ status: "error" });

//     req.session.user = {
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       age: req.user.age,
//       email: req.user.email,
//       rol: req.user.rol,
//     };

//     req.session.login = true;

//     res.redirect("/userProducst");
//   }
// );

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  sessionController.createSession.bind(sessionController)
);

// router.get("/faillogin", async (req, res) => {
//   res.send({ error: "Error en loguin" });
// });

router.get("/faillogin", sessionController.failLogin.bind(sessionController));

// router.get("/logout", (req, res) => {
//   if (req.session.login) {
//     req.session.destroy();
//   }
//   res.redirect("/");
// });

router.get("/logout", sessionController.logout.bind(sessionController));

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

// router.get(
//   "/githubcallback",
//   passport.authenticate("github", { failureRedirect: "/login" }),
//   async (req, res) => {
//     req.session.user = req.user;
//     req.session.login = true;
//     res.redirect("/profile");
//   }
// );

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionController.githubcallback.bind(sessionController)
);
module.exports = router;
