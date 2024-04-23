const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");
const cartController = new CartController();
const {
  authUser,
  isLogued,
} = require("../middleware/authentication.middleware.js");

router.post("/", cartController.createCart.bind(cartController));

router.get("/:cid", cartController.getCartById.bind(cartController));

router.post(
  "/:cid/products/:pid",
  cartController.addProductToCart.bind(cartController)
);

router.delete(
  "/:cid/products/:pid",
  cartController.deleteProduct.bind(cartController)
);

router.put(
  "/:cid/products/:pid",
  cartController.upDateProduct.bind(cartController)
);

router.delete("/:cid", cartController.deleteAllProducts.bind(cartController));

router.post("/:cid/purchase", cartController.purchase.bind(cartController))

module.exports = router;
