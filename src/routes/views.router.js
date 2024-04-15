const express = require("express");
const router = express.Router();

const ViewController = require("../controllers/view.controller.js");
const viewController = new ViewController();

const {
  authAdmin,
  authUser,
  isLogued,
  isLoggedLogin 
} = require("../middleware/authentication.middleware.js");

// router.get("/realtimeproducts", async (req, res) => {
//   try {
//     res.render("realTimeProducts");
//   } catch (error) {
//     console.log("Ha ocurrido un error", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });
router.get(
  "/realtimeproducts",
  [isLogued,
  authAdmin],
  viewController.renderView.bind(viewController)
);

// router.get("/products", async (req, res) => {
//   try {
//     const page = req.query.page;
//     const limit = req.query.limit;
//     const products = await productManager.getProducts(limit, page);
//     res.render("products", products);
//   } catch (error) {
//     console.log("Ha ocurrido un error", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });
router.get("/products", isLogued, authUser, viewController.viewProducts.bind(viewController));

// Ruta chat
// router.get("/chatOnline", async (req, res) => {
//   try {
//     res.render("chatOnline");
//   } catch (error) {
//     console.log("Ha ocurrido un error", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });
router.get("/chatOnline", isLogued, authUser, viewController.renderView.bind(viewController));

// Ruta Carts
// router.get("/carts/:cid", async (req, res) => {
//   try {
//     const cid = req.params.cid;
//     const cart = await cartManager.getCartById(cid);
//     const nuevoArray = cart.products.map((producto) => {
//       const { _id, ...rest } = producto.toObject();
//       return rest;
//     });
//     res.render("carts", {
//       products: nuevoArray,
//     });
//   } catch (error) {
//     console.log("Ha ocurrido un error", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

router.get("/carts/:cid", isLogued, authUser, viewController.viewCart.bind(viewController));

// Rutas loguin
// router.get("/", (req, res) => {
//   if (req.session.login) {
//     return res.redirect("/userProducst");
//   }
//   res.render("login");
// });

router.get("/", isLoggedLogin , viewController.renderView.bind(viewController));

// router.get("/register", (req, res) => {
//   if (req.session.login) {
//     return res.redirect("/userProducst");
//   }
//   res.render("register");
// });
router.get("/register", isLogued, viewController.renderView.bind(viewController));

// router.get("/userProducst", async (req, res) => {
//   if (!req.session.login) {
//     return res.redirect("/");
//   }

//   try {
//     const page = req.query.page;
//     const limit = req.query.limit;
//     const products = await productManager.getProducts(limit, page);
//     res.render("products", { user: req.session.user, products });
//   } catch (error) {
//     console.log("Ha ocurrido un error", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

router.get(
  "/userProducst",
  isLogued,
  authUser,
  viewController.viewProducts.bind(viewController)
);

module.exports = router;
