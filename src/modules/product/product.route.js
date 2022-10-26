const router = require('express').Router()
const { createProduct, getAllProducts } = require('./product.controller')
const upload = require('../../utils/multer')

router.post('/', upload.array('images', '3'), createProduct)
router.get('/', getAllProducts)

module.exports = router
