const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");

const PUERTO = 8080;
const path = require("path");
const addLogger = require("./utils/logger.js");
const productRouter = require("./routes/product.router.js");
const cartRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/session.router.js");
const loggerRouter = require("./routes/logger.router.js");
require("./database.js");
const swaggerOptions = require("./config/swagger.config.js");

const app = express();
app.use(cors());
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

app.use(addLogger);
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
app.use("/", loggerRouter);
const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404).render("404");
});

const httpServer = app.listen(PUERTO, () => {
  console.log("Servidor encendido en puerto 8080");
});
const io = socket(httpServer);

const ProductController = require("./controllers/product.controller.js");
const productManager = new ProductController();
const ProductRepository = require("./repositories/product.repository.js");
const productRepository = new ProductRepository();

const MessageController = require("./controllers/message.controller.js");
const messageManager = new MessageController();

const manejadorError = require("./middleware/error.middleware.js");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("products", await productRepository.getProducts());

  socket.on("delete", async (id) => {
    await productRepository.deleteProduct(id);
    socket.emit("products", await productRepository.getProducts());
  });

  socket.on("addProduct", async (data) => {
    await productRepository.addProduct(data);
    socket.emit("products", await productRepository.getProducts());
  });

  socket.emit("saveMessages", await messageManager.getMessages());

  socket.on("addMessage", async (newMessage) => {
    await messageManager.addMessages(newMessage);
    socket.emit("saveMessages", await messageManager.getMessages());
  });
});
