const mongoose = require("mongoose");
const configObject = require("./config/config.js");
const { mongo_url } = configObject;

mongoose
  .connect(mongo_url)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));
