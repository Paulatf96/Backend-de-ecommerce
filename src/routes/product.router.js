const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController();
const {
  authAdmin,
  authUser,
  isLogued,
} = require("../middleware/authentication.middleware.js");

// router.get("/", async (req, res) => {
//   try {
//     const { limit, page, sort, category, stock } = req.query;
//     let response = await productManager.getProducts(
//       limit,
//       page,
//       sort,
//       category,
//       stock
//     );

//     res.json(response);
//   } catch (error) {
//     console.error("Error al obtener los productos", error);
//     res.status(500).json({ error });
//   }
// });
router.get("/", isLogued(), authUser(), productController.getProducts());

// router.get("/:pid", async (req, res) => {
//   try {
//     const pid = req.params.pid;
//     const product = await productManager.getProductById(pid);
//     if (product) {
//       res.json(product);
//     } else {
//       res.json({ error: "Producto no encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al obtener el producto", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.get("/:pid", isLogued(), authUser(), productController.getProductById());

// router.post("/", async (req, res) => {
//   let product = req.body;
//   try {
//     await productManager.addProduct(product);
//     res.status(201).json({ message: "Producto agregado correctamente" });
//   } catch (error) {
//     console.error("Error al agregar el producto", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.post("/", isLogued(), authAdmin(), productController.addProduct());

// router.put("/:pid", async (req, res) => {
//   let pid = req.params.pid;
//   let product = req.body;
//   try {
//     await productManager.updateProduct(pid, product);
//     res.status(200).json({ message: "Producto actualizado correctamente" });
//   } catch (error) {
//     console.error("Error al actualizar el producto", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.put("/:pid", isLogued(), authAdmin(), productController.updateProduct());

// router.delete("/:pid", async (req, res) => {
//   let pid = req.params.pid;
//   try {
//     await productManager.deleteProduct(pid);
//     res.status(200).json({ message: "Producto eliminado correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar el producto", error);
//     res.status(500).json({ error: "Error del servidor" });
//   }
// });

router.delete(
  "/:pid",
  isLogued(),
  authAdmin(),
  productController.deleteProduct()
);

module.exports = router;
