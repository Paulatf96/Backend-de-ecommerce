const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        
      },
      quantity: {
        type: Number,
        
      },
    },
  ],
});

// cartSchema.pre("find",function () {
//   this.populate("products.product")
// })

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
