const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// router.post(
//   "/",
//   passport.authenticate("register", {failureRedirect: "/api/users/failedregister"}),
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
  "/",
  passport.authenticate("register", {
    failureRedirect: "/api/users/failedregister",
  }),
  userController.loguin.bind(userController)
);

// router.get("/failedregister", (req, res) => {
//   res.send({ error: "Registro fallido" });
// });

router.get("/failedregister", userController.failRegister.bind(userController));

module.exports = router;
