const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
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
    const { name, description, price, img, category } = req.body;
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

  editProduct: async (req, res) => {
    const { name, price, category, description } = req.body;
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

    // try {
    //   const categoryExists = await Category.findById(category);
    //
    //   if (!categoryExists) {
    //     return res.status(400).json({
    //       error: `Категории с ID ${category} не существует`,
    //     });
    //   }
    // } catch (e) {
    //   return res.status(400).json({
    //     error: e.toString(),
    //   });
    // }
    //
    // try {
    //   const edited = await Product.findByIdAndUpdate(
    //     id,
    //     { name },
    //     { new: true }
    //   );
    //
    //   if (!edited) {
    //     return res.status(400).json({
    //       error: "Не удалось изменить название. Проверь правильность ID",
    //     });
    //   }
    //
    //   return res.json(edited);
    // } catch (e) {
    //   return res.status(400).json({
    //     error: e.toString(),
    //   });
    // }

    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        ...req.body,
      },
    });
    product.save();
    res.send(product);
  },
};
