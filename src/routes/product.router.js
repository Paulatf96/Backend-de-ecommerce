const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController();
const {
  authAdmin,
  authUser,
  isLogued,
} = require("../middleware/authentication.middleware.js");

router.get("/", productController.getProducts.bind(productController));

router.get("/:pid", productController.getProductById.bind(productController));

router.post("/", productController.addProduct.bind(productController));

router.put("/:pid", productController.updateProduct.bind(productController));

router.delete(
  "/:pid",
  productController.deleteProduct.bind(productController)
);

router.get("/mocking/product", productController.mocking)

module.exports = router;
