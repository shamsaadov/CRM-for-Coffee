const { Router } = require('express')
const category = require('./category.route')
const product = require('./product.route')

const router = Router()

router.use(category)
router.use(product)

module.exports = router