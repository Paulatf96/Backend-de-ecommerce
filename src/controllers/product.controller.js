const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();
const generateMocks = require("../utils/mocks.js");

class ProductController {
  async getProducts(req, res) {
    try {
      const { limit, page, sort, category, stock } = req.query;
      let response = await productRepository.getProducts(
        limit,
        page,
        sort,
        category,
        stock
      );
      res.json(response);
    } catch (error) {
      req.logger.error("Error al obtener los productos", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getProductById(req, res) {
    try {
      const pid = req.params.pid;
      const product = await productRepository.getProductById(pid);
      if (product) {
        res.json(product);
      } else {
        res.json({ error: "Producto no encontrado" });
        req.logger.warning(`No pudimos encontrar el producto con id ${pid}`);
      }
    } catch (error) {
      req.logger.error("Error al obtener el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async addProduct(req, res) {
    let product = req.body;
    try {
      await productRepository.addProduct(product);
      req.logger.info(
        `Nuevo producto agregado el ${new Date().toLocaleString()}}`
      );
      res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
      req.logger.error("Error al agregar el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async updateProduct(req, res) {
    let pid = req.params.pid;
    let product = req.body;
    try {
      await productRepository.updateProduct(pid, product);
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
      req.logger.error("Error al actualizar el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async deleteProduct(req, res) {
    let pid = req.params.pid;
    try {
      await productRepository.deleteProduct(pid);
      req.logger.info(
        `El producto con id ${pid} fue elimiado el ${new Date().toLocaleString()}}`
      );
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      req.logger.error("Error al eliminar el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async mocking(req, res) {
    try {
      let products = [];
      for (let i = 0; i < 10; i++) {
        products.push(generateMocks());
      }
      res.json(products);
    } catch (error) {
      req.logger.error("Error al crear los productos", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}

module.exports = ProductController;
