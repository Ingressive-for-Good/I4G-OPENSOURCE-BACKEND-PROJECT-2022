const router = require('express').Router()
const {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getSingleProduct,
} = require('./product.controller')
const { auth } = require('../../middlewares/auth.middleware')

const upload = require('../../utils/multer')
const multerErrorHandler = require('../../middlewares/multer-errorHandler')

router.post(
    '/',
    auth,
    [upload.array('images', 3), multerErrorHandler],
    createProduct
)
router.get('/', getAllProducts)
router.delete('/:productId', auth, deleteProduct)
router.patch(
    '/:productId',
    auth,
    [upload.array('images', 3), multerErrorHandler],
    updateProduct
)
router.get('/:productId', getSingleProduct)

module.exports = router
