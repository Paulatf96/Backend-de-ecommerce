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

  async getProducts(limit = 10, page = 1, sort, category, stock) {
    let parametersSearch = {};
    let optionsPagination = {
      limit,
      page,
    };
    if (category) {
      parametersSearch.category = category;
    }
    if (stock) {
      parametersSearch.stock = { $gte: 1 };
    }
    if (sort) {
      let ordersValue = {
        "-1": "desc",
        1: "asc",
      };
      optionsPagination.sort = { price: ordersValue[sort] };
    }

    let paginatedResults;
    try {
      if (parametersSearch) {
        paginatedResults = await ProductModel.paginate(
          parametersSearch,
          optionsPagination
        );
      } else {
        paginatedResults = await ProductModel.paginate({}, optionsPagination);
      }

      if (!paginatedResults?.docs.length) {
        throw new Error("No se encontraron resultados");
      }
      const paginatedResultsFinal = paginatedResults.docs.map((product) => {
        const { ...rest } = product.toObject();
        return rest;
      });
      const productInfo = {
        status:"success",
        payload: paginatedResultsFinal,
        totalPages: paginatedResults.totalPages,
        prevPage: paginatedResults.prevPage,
        nextPage: paginatedResults.nextPage,
        page: paginatedResults.page,
        hasPrevPage: paginatedResults.hasPrevPage,
        hasNextPage: paginatedResults.hasNextPage
      };
      return productInfo;
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
    console.log(id);
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      if (!deleteProduct) {
        throw new Error("No pudimos encontrar el producto");
      }
      console.log("Producto eliminado con éxito");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

module.exports = ProductManager;
