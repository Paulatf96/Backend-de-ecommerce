const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/api/users/failedregister",
  }),
  userController.loguin.bind(userController)
);

router.get("/failedregister", userController.failRegister.bind(userController));

router.get("/profile", userController.profile.bind(userController));

router.post("/password", userController.password.bind(userController));

router.post(
  "/reset-password",
  userController.resetPassword.bind(userController)
);

router.put(
  "premium/:uid",
  userController.changeRolPremium.bind(userController)
);

module.exports = router;
