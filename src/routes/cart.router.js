const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cartManager.js");
const path = require("path");

const newCart = new CartManager(
  path.join(__dirname, "../models/carritos.json")
);

router.post("/", async (req, res) => {
  try {
    await newCart.createCart();
    res.status(201).json({ message: "Carrito creado correctamente" });
  } catch (error) {
    console.error("Error al crear el carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let cart = await newCart.getCartById(parseInt(id));
    if (cart) {
      res.json(cart);
    } else {
      res.json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let product = req.body;
  try {
    await newCart.addProductToCart(parseInt(cid), parseInt(pid), product);
    res.status(200).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el producto al carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
