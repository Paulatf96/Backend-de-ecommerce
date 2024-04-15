const ProductModel = require("../models/product.model.js");

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
      const paginatedResultsFinal = paginatedResults.docs.map((product) => {
        const { ...rest } = product.toObject();
        return rest;
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
}

module.exports = ProductRepository;
