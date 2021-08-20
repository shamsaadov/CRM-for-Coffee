const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const path = require("path");

module.exports.productsController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.aggregate([{ $sample: { size: 3 } }]);

      return res.json(products);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Product.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить продукт. Укажите верный ID",
        });
      }

      return res.json({
        message: "Продукт успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getProductsByCategoryId: async (req, res) => {
    const { id } = req.params;
    try {
      const products = await Product.find({ category: id }).populate(
        "category",
        "name, _id"
      );
      return res.json(products);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id).populate("category", "name");

      if (!product) {
        return res.status(404).json({
          error: "Продукт с таким ID не найден",
        });
      }

      return res.json(product);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  addProduct: async (req, res) => {
    const { name, description, price, img } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Укажите название продукта",
      });
    }
    if (!description) {
      return res.status(400).json({
        error: "Укажите описание продутка",
      });
    }
    if (!price || price < 0) {
      return res.status(400).json({
        error: "Укажите цену продукта",
      });
    }

    try {
      const createdProduct = await Product.create({
        name,
        description,
        price,
        category: req.params.id,
        img,
      });

      const product = await Product.findById(createdProduct._id).populate(
        "category"
      );

      return res.json(product);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  // addImg: (req, res) => {
  //   const { file } = req.files;
  //   const url = path.resolve(__dirname, "../public/uploads/image/" + file.name);
  //   const urlForDB = "/uploads/image/" + file.name;
  //   try {
  //    file.mv(url, async (err) => {
  //       if (err) {
  //         console.log(err);
  //         res.json('яц пендинг')
  //       } else {
  //         res.json(urlForDB)
  //       }
  //       res.json({
  //         img: urlForDB,
  //         text: 'Картинка загружена!'
  //       })
  //     });
  //   } catch (e) {
  //     res.json('ю пендинг')
  //     console.log(e.message);
  //   }
  // },

  editProduct: async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое название продукта",
      });
    }

    if (!description) {
      return res.status(400).json({
        error: "Необходимо указать новое название продукта",
      });
    }

    if (!price || price < 0) {
      return res.status(400).json({
        error: "Неверно указана цена продукта",
      });
    }
    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        ...req.body,
      },
    });
    res.send(product);
  },
};
