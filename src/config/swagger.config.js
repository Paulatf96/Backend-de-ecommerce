const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de Ecommerce Atenea",
      description: "Ecommerce de joyas",
    },
  },
  apis: [`./src/docs/**/*.yaml`],
};

module.exports = swaggerOptions;
