const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");
module.exports.cartController = {
  addCart: async (req, res) => {
    const { products } = req.body;
    try {
      const cart = await Cart.create({
        products,
      });
      return res.json(cart);
    } catch (e) {
      console.log(e.message);
    }
  },

  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      res.json(cart);
    } catch (e) {
      console.log(e.message);
    }
  },

  addProductInCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      cart.products.push(...req.body);
    } catch (e) {
      console.log(e.message);
    }
  },

};
