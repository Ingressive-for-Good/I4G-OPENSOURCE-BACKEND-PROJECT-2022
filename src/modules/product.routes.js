const router = require('express').Router()
const {
    createProduct,
    deleteSingleProduct,
    interestedUsers,
    getSingleProduct,
} = require('./product.controller')
const { verifyUser } = require('./user.controller')

router
    .post('/create', verifyUser, createProduct)
    .get('/:productId/interested-users', verifyUser, interestedUsers)
    .get('/:productId', verifyUser, getSingleProduct)
    .delete('/:productId', verifyUser, deleteSingleProduct)

module.exports = router
