const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    ref: "Category",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Substance = mongoose.model("Product", ProductSchema);

module.exports = Substance;
