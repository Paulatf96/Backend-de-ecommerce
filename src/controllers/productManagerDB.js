const ProductModel = require("../models/product.model.js");

class ProductManager {
  async addProduct(item) {
    try {
      if (
        !item.title ||
        !item.description ||
        !item.price ||
        !item.img ||
        !item.stock ||
        !item.status ||
        !item.category ||
        !item.code
      ) {
        console.log("No se puede agregar el producto, hay un campo vacio");
        return;
      }

      let validation = await ProductModel.findOne({ code: item.code });
      if (validation) {
        console.log("Este producto ya existe");
        return;
      } else {
        const newProduct = new ProductModel({
          title: item.title,
          description: item.description,
          price: item.price,
          img: item.img,
          code: item.code,
          stock: item.stock,
          category: item.category,
          status: item.status || true,
          thumbnail: item.thumbnail || [],
        });
        await newProduct.save();
      }
    } catch (error) {
      console.log("Error al agregar el producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        console.log("El producto buscado no existe");
        return null;
      }
      console.log("Producto encontrado");
      return product;
    } catch (error) {
      console.log("Error al obtener el producto", error);
    }
  }

  async updateProduct(id, item) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, item);
      if (!updateProduct) {
        console.log("Producto no encontrado");
        return null;
      }
      console.log("Producto actualizado");
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("El producto no existe");
        return null;
      }
      console.log("Producto eliminado con éxito");
      return deleteProduct;
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

module.exports = ProductManager;
