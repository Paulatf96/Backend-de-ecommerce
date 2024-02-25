const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cartManagerDB");


const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado correctamente" });
  } catch (error) {
    console.error("Error al crear el carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  let cid = req.params.id;
  try {
    let cart = await cartManager.getCartById(cid);
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
    await cartManager.addProductToCart(cid, pid, product);
    res.status(200).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el producto al carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
