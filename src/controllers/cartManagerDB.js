const CartModel = require("../models/cart.model.js");

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({
        products: [],
      });
      newCart.save();
    } catch (error) {
      console.log("Error al crear carrito");
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        console.log("El carrito buscado no existe");
        return;
      }
      console.log("Carrito encontrado");
      return cart;
    } catch (error) {
      console.log("Error al buscar el carrito", error);
    }
  }

  async addProductToCart(cid, pid, quantity = 1) {
    try {
      const cart = await this.getCartById(cid);
      const existingProduct = cart.products.find(
        (prod) => prod._id.toString() == pid
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const newProduct = {
          product: pid,
          quantity: quantity,
        };
        cart.products.push(newProduct);
      }
      cart.markModified("products")
      cart.save()
      return cart 
    } catch (error) {
        console.log("Error al agregar el producto", error);
    }
  }
}


module.exports= CartManager