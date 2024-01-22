const fs = require("fs");

class ProductManager {
  static id = 1;
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(item) {
    let validation = this.products.find((product) => product.code == item.code);
    if (!validation) {
      if (
        item.title &&
        item.description &&
        item.price &&
        item.thumbnail &&
        item.stock
      ) {
        item["id"] = ProductManager.id;
        ProductManager.id++;

        this.products.push(item);
        addToFile(this.path, this.products);
      } else {
        console.log(
          "Para ingresar un producto debe diligenciar todos los campos"
        );
      }
    } else {
      console.log(
        "No se puede agregar el producto, identificador ya registrado"
      );
    }
  }

  async getProducts() {
    const allProducts = await this.readProducts(this.path);
    return allProducts;
  }

  async updateProduct(id, item) {
    const allProducts = await this.readProducts(this.path);
    const index = allProducts.findIndex((e) => e.id == id);
    console.log("el index es" + index);
    if (index != -1) {
      item.id = id;
      allProducts.splice(index, 1, item);
      addToFile(this.path, allProducts);
    }
  }

  async deleteProduct(id) {
    const allProducts = await this.readProducts(this.path);
    const index = allProducts.findIndex((e) => e.id == id);

    if (index != -1) {
      allProducts.splice(index, 1);
      addToFile(this.path, allProducts);
    } else {
      console.log("id no encontrado");
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readProducts(this.path);

      let findedProduct = products.find((item) => item.id == id);

      if (findedProduct) {
        console.log(
          "Encontrado, su producto es " + JSON.stringify(findedProduct)
        );
        return findedProduct;
      } else {
        console.log("Not found");
      }
    } catch (error) {
      console.log("getProductById ERROR", error);
    }
  }

  async readProducts(ruta) {
    console.log(ruta);
    if (fs.existsSync(ruta)) {
      let products = await fs.promises.readFile(ruta, "utf-8");
      return JSON.parse(products);
    } else {
      console.log("Ups, el archivo que estás intentando obtener no existe ");
      return [];
    }
  }

  async addToFile(ruta, products) {
    await fs.promises.writeFile(ruta, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;
