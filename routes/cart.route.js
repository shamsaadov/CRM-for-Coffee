const { Router } = require("express");
const { cartController } = require("../controllers/сart.controller");
const router = Router();

router.get('/cart/:id', cartController.getCartById)
router.post('/cart', cartController.addCart)