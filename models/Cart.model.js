const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  name: {
    type: String
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      amount: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
