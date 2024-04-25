const CartModel = require("../models/cart.model.js");
const ProductModel = require("../models/product.model.js");
const TicketRepository = require("./ticket.repository.js");
const ticketRepository = new TicketRepository();

class CartRepository {
  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).populate("products.product");
      if (!cart) {
        throw new Error("El carrito buscado no existe");
      }

      return cart;
    } catch (error) {
      console.log("Error al buscar el carrito", error);
    }
  }

  async createCart() {
    try {
      const newCart = new CartModel({
        products: [],
      });
      return newCart.save();
    } catch (error) {
      console.log("Error al crear carrito");
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
      return cart.save();
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
      return cart.save();
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteAllProducts(cid) {
    try {
      const cart = await this.getCartById(cid);
      if (!cart) {
        throw new Error("No pudimos encontrar el carrito");
      }
      cart.products = [];
      cart.markModified("products");
      return cart.save();
    } catch (error) {
      console.log("Error al eliminar los productos", error);
    }
  }

  async getProductsFromCart(cid) {
    try {
      const cart = await this.getCartById(cid);
      if (!cart) {
        throw new Error("No pudimos encontrar el carrito");
      }
      const products = cart.products.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return rest;
      });
      return products;
    } catch (error) {
      console.log("Error al listar los productos", error);
    }
  }

  async purchase(cid, userEmail) {
    try {
      const cart = await this.getCartById(cid);
      const products = cart.products;
      let selledProducts = [];
      let unavailableProducts = [];
      // let verification = cart.products.map((product) => {
      //   let productWithStock = ProductModel.findById(product._id);
      //   if (productWithStock.stock >= product.quantity) {
      //     productWithStock.stock -= product.quantity;
      //     selledProducts.push(product);
      //   } else {
      //     unavailableProducts.push(product);
      //   }
      //   productWithStock.markModified("stock");
      //   productWithStock.save();
      // });

      // return { unavailableProducts, selledProducts };

      for (const product of products) {
        try {
          const productWithStock = await ProductModel.findById(product.product);

          if (productWithStock.stock >= product.quantity) {
            productWithStock.stock -= product.quantity;
            selledProducts.push(product);
            productWithStock.markModified("stock");
            await productWithStock.save();
          } else {
            unavailableProducts.push(product.product);
          }
        } catch (error) {
          console.error(`Error al procesar el producto ${product._id}:`, error);
        }
      }
      const ticket = await ticketRepository.createTicket(
        selledProducts,
        userEmail
      );

      // await this.deleteAllProducts(cid);
      cart.products = cart.products.filter((product) => {
        return !selledProducts.find(
          (soldProduct) =>
          soldProduct._id.toString() == product._id.toString()
        );
      });
      cart.markModified("products");
      await cart.save();

      return { unavailableProducts, selledProducts, ticket,cart };
    } catch (error) {
      console.log("Error al realizar la compra", error);
    }
  }
}

module.exports = CartRepository;
