const router = require('express').Router()
const {
    createProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
} = require('./product.controller')

const upload = require('../../utils/multer')
const multerErrorHandler = require('../../middlewares/multer-errorHandler')

router.post('/', [upload.array('images', 3), multerErrorHandler], createProduct)
router.get('/', getAllProducts)
router.delete('/:productId', deleteProduct)
router.get('/:productId', getSingleProduct)

module.exports = router
