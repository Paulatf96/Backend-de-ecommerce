const infoErrorUser = (user) => {
  return ` Los datos estan incompletos o son invalidos. 
        Necesitamos recibir lo siguiente: 
        - Nombre: String, pero recibimos ${user.name}
        - Apellido: String, pero recibimos ${user.last_name}
        - Email: String, recibimos ${user.email}
    `;
};

const infoErrorProduct = (product) => {
  return `The data is incomplete or invalid.
    We need to receive the following:
    - Tittle: String, but we receive ${product.tittle}
    - Description: String, but we receive ${product.description}
    - Price: Number, but we receive ${product.price}
    - Code: String, but we receive ${product.code}
    - Stock: Number, but we receive ${product.stock}
    - Category: String, but we receive ${product.category}
    - Status: Boolean, but we receive ${product.status}`;
};

module.exports = {
  infoErrorUser,
  infoErrorProduct,
};
