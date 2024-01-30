const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const path = require("path");

const productManager = new ProductManager(
  path.join(__dirname, "../models/productos.json")
);

router.get("/", async (req, res) => {
  try {
    let limit = req.query.limit;
    let response = await productManager.getProducts();
    if (limit) {
      let resWithLimit = response.slice(0, limit);
      res.json(resWithLimit);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  let pid = req.params.pid;
  console.log(pid);
  try {
    let product = await productManager.getProductById(parseInt(pid));
    if (product) {
      res.json(product);
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/", async (req, res) => {
  let product = req.body;
  console.log(product);
  try {
    await productManager.addProduct(product);
    res.status(201).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el producto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  let pid = req.params.pid;
  let product = req.body;
  try {
    await productManager.updateProduct(parseInt(pid), product);
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    await productManager.deleteProduct(parseInt(pid));
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
