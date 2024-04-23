const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();

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
      console.error("Error al obtener los productos", error);
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
      }
    } catch (error) {
      console.error("Error al obtener el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async addProduct(req, res) {
    let product = req.body;
    try {
      await productRepository.addProduct(product);
      res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
      console.error("Error al agregar el producto", error);
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
      console.error("Error al actualizar el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async deleteProduct (req, res){
    let pid = req.params.pid;
    try {
      await productRepository.deleteProduct(pid);
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}

module.exports = ProductController;