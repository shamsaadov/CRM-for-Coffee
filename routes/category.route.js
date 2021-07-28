const { Router } = require("express");
const { categoryController } = require("../controllers/categories.controller");

const router = Router();

router.get("/category", categoryController.getCategory);

router.post("/category", categoryController.addCategory);

router.delete("/category/:id", categoryController.removeCategory);

router.patch("/category/:id", categoryController.updateCategory);

module.exports = router