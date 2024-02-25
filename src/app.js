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

const ProductManager = require("./controllers/productManagerDB.js");
const productManager = new ProductManager();

const MessageManager = require("./controllers/messagesManagerDB.js");
const messageManager = new MessageManager();

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("products", await productManager.getProducts());

  socket.on("delete", async (id) => {
    await productManager.deleteProduct(id);
    socket.emit("products", await productManager.getProducts());
  });

  socket.on("addProduct", async (data) => {
    await productManager.addProduct(data);
    socket.emit("products", await productManager.getProducts());
  });

  socket.emit("saveMessages", await messageManager.getMessages());

  socket.on("addMessage", async (newMessage) => {
    await messageManager.addMessages(newMessage);
    socket.emit("saveMessages", await messageManager.getMessages());
  });
});
