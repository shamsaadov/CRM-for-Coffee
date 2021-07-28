const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  method: {
    enum: ["Delivery", "Hall", "Takeaway"],
    required: true,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
