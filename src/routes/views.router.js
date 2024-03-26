const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManagerDB.js");
const CartManager = require("../controllers/cartManagerDB.js");
const cartManager = new CartManager();
const productManager = new ProductManager();

// Rutas productos
// router.get("/", async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.render("home", { products });
//   } catch (error) {
//     console.log("Ha ocurrio un error", error);
//     res.status(500).json({ error: "error interno del servidor" });
//   }
// });

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit, page);
    res.render("products", products);
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
// Ruta chat
router.get("/chatOnline", async (req, res) => {
  try {
    res.render("chatOnline");
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Ruta Carts
router.get("/carts/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    const nuevoArray = cart.products.map((producto) => {
      const { _id, ...rest } = producto.toObject();
      return rest;
    });
    
    res.render("carts", {
      products: nuevoArray,
    });
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Rutas loguin
router.get("/", (req, res) => {
  if (req.session.login) {
      return res.redirect("/userProducst");
  }
  res.render("login");
});


router.get("/register", (req, res) => {
  if (req.session.login) {
      return res.redirect("/userProducst");
  }
  res.render("register");
});

router.get("/userProducst", async (req, res) => {
  if (!req.session.login) {
      return res.redirect("/");
  }

  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit, page);
    res.render("products", { user: req.session.user, products });
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
