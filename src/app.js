const express = require("express");
const app = express();
const PUERTO = 8080;
const path = require("path");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PUERTO, () => {
  console.log("Servidor encendido en puerto 8080");
});

app.use("/api/cart", cartRouter);

app.use("/api/product", productRouter);
