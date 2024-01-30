const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(item) {
    try {
      const allProducts = await this.readProducts(this.path);
      const lastId = allProducts.length + 1;
      let validation = allProducts.find((product) => product.code == item.code);
      if (!validation) {
        if (
          item.title &&
          item.description &&
          item.price &&
          item.thumbnails &&
          item.stock &&
          item.status &&
          item.category
        ) {
          const newProduct = {
            id: lastId,
            title: item.title,
            description: item.description,
            code: item.code,
            stock: item.stock,
            category: item.category,
            status: item.status || true,
            price: item.price,
            thumbnail: item.thumbnail || [],
          };

          allProducts.push(newProduct);
          await this.addToFile(this.path, allProducts);
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
    } catch (error) {
      console.log("Error al agregar el producto", error);
    }
  }

  async getProducts() {
    try {
      const allProducts = await this.readProducts(this.path);
      return allProducts;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async updateProduct(id, item) {
    try {
      const allProducts = await this.readProducts(this.path);
      const index = allProducts.findIndex((e) => e.id == id);
      if (index != -1) {
        item.id = id;
        allProducts.splice(index, 1, item);
        await this.addToFile(this.path, allProducts);
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const allProducts = await this.readProducts(this.path);
      const index = allProducts.findIndex((e) => e.id == id);
      if (index != -1) {
        allProducts.splice(index, 1);
        await this.addToFile(this.path, allProducts);
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
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
        return null;
      }
    } catch (error) {
      console.log("getProductById ERROR", error);
    }
  }

  async readProducts(ruta) {
    try {
      if (fs.existsSync(ruta)) {
        let products = await fs.promises.readFile(ruta, "utf-8");
        return JSON.parse(products);
      } else {
        console.log("Ups, el archivo que estás intentando obtener no existe ");
        return [];
      }
    } catch (error) {
      console.log("Error al leer productos", error);
    }
  }

  async addToFile(ruta, products) {
    try {
      await fs.promises.writeFile(ruta, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log("Error al escribir el archivo", error);
    }
  }
}

module.exports = ProductManager;
