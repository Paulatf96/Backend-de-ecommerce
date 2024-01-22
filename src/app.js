const express = require("express");
const app = express();
const PUERTO = 8080;
const path = require("path");
const ProductManager = require("./productManager.js");

const productManager = new ProductManager(
  path.join(__dirname, "productos.json")
);
app.use(express.urlencoded({ extended: true }));

app.listen(PUERTO, () => {
  console.log("Servidor encendido en puerto 8080");
});

app.get("/api/products", async (req, res) => {
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

app.get("/api/products/:pid", async (req, res) => {
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
