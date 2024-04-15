const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");

const PUERTO = 8080;
const path = require("path");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessionRouter.js");
require("./database.js");

const app = express();
const httpServer = app.listen(PUERTO, () => {
  console.log("Servidor encendido en puerto 8080");
});

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(
  session({
    secret: "secretcoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://paulatf96:coderhouse@cluster0.uau4lcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100,
    }),
  })
);
app.use(cors());

//Configuración passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Configuración handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

const io = socket(httpServer);

const ProductManager = require("./controllers/productController.js");
const productManager = new ProductManager();

const MessageManager = require("./controllers/messagesController.js");
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
