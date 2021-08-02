const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");
module.exports.cartController = {
  // addToCart: async (req, res) => {
  //   const { product, amount } = req.body;
  //
  //   // достать документ где user = userId
  //   //читаем модель Cart где user равен userId
  //   let cart = await Cart.find()
  //   //если данный документ
  //   if (cart) {
  //     //проверяем с помощью findindex есть ли в документе item равный id продукту
  //     let cartIndex = cart.products.findIndex((item) => {
  //       return item.product.toString() === product;
  //     });
  //
  //     //если данный индекс не равен -1
  //     if (cartIndex !== -1) {
  //       //то   в нашем документе где юзер, c необходимым индексом, обращаемся к ключу amount и прибавляем значение
  //       cart.products[cartIndex].amount += amount;
  //       //либо так
  //       // if(cartIndex > -1) {
  //       //   let productItem = cart.products[cartIndex]
  //       //   productItem.amount = amount
  //       //   cart.products[cartIndex] = productItem
  //     } else {
  //       //в данный документ с продуктами добавляем еще 1 элемент с количество
  //       cart.products.push({ product: product, amount: amount });
  //     }
  //     //все дело сохраняем
  //     await cart.save();
  //     res.json(cart);
  //   } else {
  //     //если нет продукта в корзине создаем новый
  //     const addToCart = await new Cart({
  //       products: [
  //         {
  //           product: product,
  //           amount: amount,
  //         },
  //       ],
  //     });
  //     await addToCart.save();
  //     res.json(addToCart);
  //}
  // проверить есть ли в ключе products документ с item = productId

  // если есть то + amount

  // если нет, то вставить новый документ
  // },

  // addCart: async (req, res) => {
  //   const { products } = req.body;
  //   try {
  //     const cart = await Cart.create({
  //       products,
  //     });
  //     return res.json(cart);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.find().populate({
        path: "products",
        model: "Cart",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      return res.json(cart);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  addProductInCart: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const cart = await Cart.updateOne(
        { _id: id },
        { $addToSet: { productsItems: data } }
      );
      return res.json(cart);
    } catch (e) {
      console.log(e.message);
    }
  },

  addCart: async (req, res) => {
    try {
      const cart = await new Cart({
        ...req.body,
      });
      cart.save();
      res.json(cart);
    } catch (e) {
      console.log(e.message);
    }
  },

  deleteProductFromCart: async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    try {
      cart.products.forEach((item, index) => {
        if (String(item.id) === req.params.id) {
          cart.products(index, 1);
        }
        cart.save();
        return res.json(cart);
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
};
