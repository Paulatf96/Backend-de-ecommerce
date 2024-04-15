const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class CartController {
  async createCart(req, res) {
    try {
      await cartRepository.createCart();
      res.status(201).json({ message: "Carrito creado correctamente" });
    } catch (error) {
      console.error("Error al crear el carrito", error);
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
      await cartRepository.addProductToCart(cid, pid);
      res.status(200).json({ message: "Producto agregado correctamente" });
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async deleteProduct(req, res) {
    let cid = req.params.cid;
    let pid = req.params.pid;
    try {
      await cartRepository.deleteProduct(cid, pid);
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async upDateProduct(req, res) {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body;
    try {
      await cartRepository.upDateProduct(cid, pid, quantity);
      res.status(200).json({ message: "Producto actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteAllProducts(req, res) {
    let cid = req.params.cid;
    try {
      await cartRepository.deleteAllProducts(cid);
      res.status(200).json({ message: "Productos eliminados con éxito" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = CartController;
