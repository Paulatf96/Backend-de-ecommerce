const express = require("express");
const router = express.Router();
const passport = require("passport");
const SessionController = require("../controllers/session.controller.js");
const sessionController = new SessionController();

const EMAIL_ADMIN = "adminCoder@coder.com";
const PASSWORD_ADMIN = "adminCod3r123";

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  sessionController.createSession.bind(sessionController)
);

router.get("/faillogin", sessionController.failLogin.bind(sessionController));

router.get("/logout", sessionController.logout.bind(sessionController));

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionController.githubcallback.bind(sessionController)
);
module.exports = router;
