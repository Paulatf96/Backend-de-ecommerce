const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");
const cartController = new CartController();
const {
  authUser,
  isLogued,
} = require("../middleware/authentication.middleware.js");

// router.post("/", async (req, res) => {
//   try {
//     await cartManager.createCart();
//     res.status(201).json({ message: "Carrito creado correctamente" });
//   } catch (error) {
//     console.error("Error al crear el carrito", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.post("/", isLogued(), authUser(), cartController.createCart());

// router.get("/:id", async (req, res) => {
//   let cid = req.params.id;
//   try {
//     let cart = await cartManager.getCartById(cid);
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.json({ error: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al obtener el carrito", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });
router.get("/:cid", isLogued(), authUser(), cartController.getCartById());

// router.post("/:cid/products/:pid", async (req, res) => {
//   let cid = req.params.cid;
//   let pid = req.params.pid;

//   try {
//     await cartManager.addProductToCart(cid, pid);
//     res.status(200).json({ message: "Producto agregado correctamente" });
//   } catch (error) {
//     console.error("Error al agregar el producto al carrito", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });
router.post(
  "/:cid/products/:pid",
  isLogued(),
  authUser(),
  cartController.addProductToCart()
);

// router.delete("/:cid/products/:pid", async (req, res) => {
//   let cid = req.params.cid;
//   let pid = req.params.pid;
//   try {
//     await cartManager.deleteProduct(cid, pid);
//     res.status(200).json({ message: "Producto eliminado con éxito" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.delete(
  "/:cid/products/:pid",
  isLogued(),
  authUser(),
  cartController.deleteProduct()
);

// router.put("/:cid/products/:pid", async (req, res) => {
//   let cid = req.params.cid;
//   let pid = req.params.pid;
//   let quantity = req.body;
//   try {
//     await cartManager.upDateProduct(cid, pid, quantity);
//     res.status(200).json({ message: "Producto actualizado con éxito" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.put(
  "/:cid/products/:pid",
  isLogued(),
  authUser(),
  cartController.upDateProduct()
);

// router.delete("/:cid", async (req, res) => {
//   let cid = req.params.cid;
//   try {
//     await cartManager.deleteAllProducts(cid);
//     res.status(200).json({ message: "Productos eliminados con éxito" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.delete(
  "/:cid",
  isLogued(),
  authUser(),
  cartController.deleteAllProducts()
);

module.exports = router;
