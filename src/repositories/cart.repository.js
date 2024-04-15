const CartModel = require("../models/cart.model.js");

class CartRepository {
  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).populate("products.product");
      if (!cart) {
        throw new Error("El carrito buscado no existe");
      }
      const cartArray = cart.products.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return rest;
      });
      return cartArray;
    } catch (error) {
      console.log("Error al buscar el carrito", error);
    }
  }
}

module.exports = CartRepository