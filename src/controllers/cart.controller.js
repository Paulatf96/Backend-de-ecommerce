const CartModel = require("../models/cart.model.js");

class CartController {
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
      const cart = await CartModel.findById(id).populate("products.product");
      if (!cart) {
        throw new Error("El carrito buscado no existe")
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
      cart.markModified("products");
      cart.save();
      return cart;
    } catch (error) {
      console.log("Error al agregar el producto", error);
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
      const existingProductIndex = cart.products.findIndex(
        (product) => product.product == pid
      );
      if (existingProductIndex === -1) {
        throw new Error("No pudimos encontrar el producto");
      }
      cart.products.splice(existingProductIndex, 1);
      cart.markModified("products");
      cart.save();
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }

  async upDateProduct(cid, pid, quantity) {
    try {
      const cart = await this.getCartById(cid);
      const existingProduct = cart.products.find((prod) => prod.product == pid);
      if (existingProduct) {
        let quantityValue = quantity.quantity;
        existingProduct.quantity += quantityValue;
      } else {
        throw new Error("No pudimos encontrar el producto");
      }
      cart.markModified("products");
      cart.save();
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteAllProducts (cid) {
    try {
      const cart = await this.getCartById(cid);
      if(!cart){
        throw new Error("No pudimos encontrar el carrito");
      }
      cart.products = []
      cart.markModified("products");
      cart.save();

    } catch (error) {
      console.log("Error al eliminar los productos", error);
    }
  }
}

module.exports = CartController;
