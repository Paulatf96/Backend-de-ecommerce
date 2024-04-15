const ProductController = require("../controllers/product.controller.js");
const CartController = require("../controllers/cart.controller.js");
const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class ViewController {
  async renderView(req, res) {
    try {
      let view = req.url;
      if (req.url == "/") {
        view = "/userProducst";
      }
      res.render(view);
    } catch (error) {
      console.log("Ha ocurrido un error", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async viewProducts(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const products = await productRepository.getProducts(limit, page);
      res.render("products", {user: req.session.user,products});
    } catch (error) {
      console.log("Ha ocurrido un error", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async viewCart(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await cartRepository.getCartById(cid);
      res.render("carts", {
        products: cart,
      });
    } catch (error) {
      console.log("Ha ocurrido un error", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = ViewController;
