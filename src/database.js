const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://paulatf96:coderhouse@cluster0.uau4lcw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));
