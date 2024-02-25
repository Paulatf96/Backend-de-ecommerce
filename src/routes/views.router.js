const express = require("express");
const router = express.Router();


const ProductManager = require("../controllers/productManagerDB.js");
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.log("Ha ocurrio un error", error);
    res.status(500).json({ error: "error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/chatOnline", async (req,res) =>{
  try {
    res.render("chatOnline")
  } catch (error) {
    console.log("Ha ocurrido un error", error)
    res.status(500).json({error:"Error interno del servidor"})
  }
})
module.exports = router;
