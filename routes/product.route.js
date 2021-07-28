const { Router } = require("express");
const { productsController } = require("../controllers/product.controller");

const router = Router();

router.get("/product", productsController.getProducts);
router.get('/products', productsController.getAllProducts)
router.get("/product/:id", productsController.getProductById);
router.get("/product/:id/category", productsController.getProductsByCategoryId);
router.post("/category/:id/product", productsController.createProduct);
router.patch("/category/:id/product", productsController.editProduct);
router.delete("/category/:id/product", productsController.removeProduct);

module.exports = router

