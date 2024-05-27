const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de la App Adoptame",
      description:
        "App Web dedicada a encontrar familias para los perritos de la calle",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

module.exports = swaggerOptions;
