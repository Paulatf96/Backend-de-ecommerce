const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();
const UserDTO = require("../dto/user.dto.js");

class CartController {
  async createCart(req, res) {
    try {
      const nuevoCarrito = await cartRepository.createCart();
      res.status(200).json(nuevoCarrito);
    } catch (error) {
      console.error("Error al crear el carrito", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }
  async getProductsFromCart(req, res) {
    let cid = req.params.cid;
    try {
      const products = await cartRepository.getProductsFromCart(cid);
      res.redirect(`/carts/${cid}`)
    } catch (error) {
      console.error("Error al listar los productos", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async getCartById(req, res) {
    let cid = req.params.cid;
    try {
      let cart = await cartRepository.getCartById(cid);
      if (cart) {
        res.json(cart);
      } else {
        res.json({ error: "Carrito no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async addProductToCart(req, res) {
    let cid = req.params.cid;
    let pid = req.params.pid;

    try {
      const cart = await cartRepository.addProductToCart(cid, pid);
      res
        res.redirect("/products");
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async deleteProduct(req, res) {
    let cid = req.params.cid;
    let pid = req.params.pid;
    try {
      const cart = await cartRepository.deleteProduct(cid, pid);
      res.status(200).json({ message: "Producto eliminado con éxito" }, cart);
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async upDateProduct(req, res) {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body;
    try {
      const cart = await cartRepository.upDateProduct(cid, pid, quantity);
      res.status(200).json({ message: "Producto actualizado con éxito" }, cart);
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async deleteAllProducts(req, res) {
    let cid = req.params.cid;
    try {
      await cartRepository.deleteAllProducts(cid);
      res.status(200).json({ message: "Productos eliminados con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async purchase(req, res) {
    let cid = req.params.cid;
    let userEmail = req.sessions.user.email;
    try {
      const resultCart = await cartRepository.purchase(cid, userEmail);
      res.status(200).redirect(`/carts/:${cid}`);
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}

module.exports = CartController;
