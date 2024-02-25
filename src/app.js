const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");

const PUERTO = 8080;
const path = require("path");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
require("./database.js");

const app = express();
const httpServer = app.listen(PUERTO, () => {
  console.log("Servidor encendido en puerto 8080");
});

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Configuración handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/", viewsRouter);

const io = socket(httpServer);

const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("products", await productManager.getProducts());

  socket.on("delete", async (id) => {
    await productManager.deleteProduct(id);
    socket.emit("productos", await productManager.getProducts());
  });

  socket.on("addProduct", async (data) => {
    await productManager.addProduct(data);
    socket.emit("productos", await productManager.getProducts());
  });
});
