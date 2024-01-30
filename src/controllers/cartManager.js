const fs = require("fs");

class CartManager {
  static id = 1;
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async createCart() {
    try {
      const allCarts = await this.readCarts(this.path);
      const lastId = allCarts.length + 1;
      const newCart = {
        id: lastId,
        products: [],
      };
      CartManager.id++;
      allCarts.push(newCart);
      await this.addToFile(this.path, allCarts);
    } catch (error) {
      console.log("Error al crear el carrito", error);
    }
  }

  async getCartById(id) {
    try {
      const allCarts = await this.readCarts(this.path);
      const cart = allCarts.find((cart) => cart.id == id);
      return cart.products;
    } catch (error) {
      console.log("Error al obtener el carrito", error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const allCarts = await this.readCarts(this.path);
      const cart = allCarts.find((cart) => cart.id == cid);
      const existingProduct = cart.products.find((prod) => prod.id == pid);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newProduct = {
          id: pid,
          quantity: 1,
        };
        cart.products.push(newProduct);
      }

      await this.addToFile(this.path, allCarts);
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }

  async readCarts(path) {
    try {
      if (fs.existsSync(path)) {
        const carts = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(carts);
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error al leer los carritos", error);
    }
  }

  async addToFile(ruta, data) {
    try {
      await fs.promises.writeFile(ruta, JSON.stringify(data, null, "\t"));
    } catch (error) {
      console.log("Error al escribir el archivo", error);
    }
  }
}

module.exports = CartManager;
