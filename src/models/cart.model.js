const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        
      },
      quantity: {
        type: Number,
        
      },
    },
  ],
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
