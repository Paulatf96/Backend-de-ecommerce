const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  authAdmin,
  isLogued,
} = require("../middleware/authentication.middleware.js");

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
  "/premium/:uid",
  userController.changeRolPremium.bind(userController)
);

router.get(
  "/all-users",
  isLogued,
  authAdmin,
  userController.getUsers.bind(userController)
);

router.delete(
  "/delete-inactive",
  userController.deleteInactiveUsers.bind(userController)
);

router.delete("/delete/:uid", userController.delete.bind(userController));

module.exports = router;
