const ProductModel = require("../models/product.model.js");
const CustomError = require("../services/errors/custom-error.js");
const EErrors = require("../services/errors/enum.js");
const { infoErrorProduct } = require("../services/errors/info.js");

class ProductRepository {
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

      const paginatedResultsFinal = paginatedResults.docs.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return { id: _id, ...rest };
      });
      const productInfo = {
        status: "success",
        payload: paginatedResultsFinal,
        totalPages: paginatedResults.totalPages,
        prevPage: paginatedResults.prevPage,
        nextPage: paginatedResults.nextPage,
        page: paginatedResults.page,
        hasPrevPage: paginatedResults.hasPrevPage,
        hasNextPage: paginatedResults.hasNextPage,
      };
      return productInfo;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

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
        CustomError.createError({
          name: "Product create error",
          cause: infoErrorProduct(item),
          message: "Error trying to create product",
          code: EErrors.INVALID_TYPE,
        });
        return null;
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
          owner,
        });
        await newProduct.save();
      }
    } catch (error) {
      throw error;
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
        throw new Error("No pudimos encontrar el producto");
      }
      console.log("Producto eliminado con éxito");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

module.exports = ProductRepository;
