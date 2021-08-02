const { Router } = require('express')
const category = require('./category.route')
const product = require('./product.route')
const cart = require('./cart.route')

const router = Router()

router.use(category)
router.use(product)
// router.use(cart)

module.exports = router