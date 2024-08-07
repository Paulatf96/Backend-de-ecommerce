const express = require("express");
const router = express.Router();

const ViewController = require("../controllers/view.controller.js");
const viewController = new ViewController();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

const {
  authAdmin,
  authUser,
  isLogued,
  isLoggedLogin,
} = require("../middleware/authentication.middleware.js");

router.get(
  "/realTimeProducts",
  [isLogued],
  viewController.renderView.bind(viewController)
);

router.get(
  "/products",
  [isLogued, authUser],
  viewController.viewProducts.bind(viewController)
);

router.get(
  "/chatOnline",
  [isLogued, authUser],
  viewController.renderView.bind(viewController)
);

router.get(
  "/carts/:cid",
  [isLogued, authUser],
  viewController.viewCart.bind(viewController)
);

router.get("/", isLoggedLogin, viewController.renderView.bind(viewController));

router.get(
  "/register",
  isLogued,
  viewController.renderView.bind(viewController)
);

router.get(
  "/userProducst",
  [isLogued, authUser],
  viewController.viewProducts.bind(viewController)
);

router.get("/current", [isLogued], userController.profile.bind(userController));
router.get("/password", viewController.renderView.bind(viewController));
router.get("/changepassword", viewController.renderView.bind(viewController));
router.get(
  "/confirmationPassword",
  viewController.renderView.bind(viewController)
);

router.get("/success", (req, res) => {
  const { resultCart } = req.query;
  console.log(resultCart);
  res.render("success");
});

module.exports = router;
