const { Router } = require("express");
const { cartController } = require("../controllers/сart.controller");
const router = Router();

router.post("/cart", cartController.addCart);
router.get('/cart', cartController.getCart)
router.post('/cart/:id', cartController.addProductInCart)

module.exports = router;
