const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },

  last_name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  password: {
    type: String,
  },

  age: {
    type: Number,
  },

  rol: {
    type: String,
  },

  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
