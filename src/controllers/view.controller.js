const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class ViewController {
  async renderView(req, res) {
    try {
      let view = req.url.slice(1);
      if (view == "") {
        view = "login";
      }
      res.render(view);
    } catch (error) {
      req.logger.error(
        "Ha ocurrido un error renderizando la vista solicitada",
        error
      );
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async viewProducts(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const products = await productRepository.getProducts(limit, page);

      const cartId = req.user.cart.toString();
      res.render("products", { user: req.session.user, products, cartId });
    } catch (error) {
      req.logger.error("Ha ocurrido un error listando los productos", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async viewCart(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await cartRepository.getCartById(cid);
      const cartArray = cart.products.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return rest;
      });
      res.render("carts", {
        products: cartArray,
      });
    } catch (error) {
      req.logger.error("Ha ocurrido un error visualizando el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = ViewController;
