const express = require('express')
const categoryController = require('./category.controller')
const { inputValidator } = require('../../middlewares/input.validator')
const categorySchema = require('./category.validator')
const { authAdmin } = require('../../middlewares/auth.middleware')

const router = express.Router()

router.post(
    '/',
    authAdmin,
    inputValidator(categorySchema),
    categoryController.createCategory
)

router.delete('/:categoryId', authAdmin, categoryController.deleteCategory)

module.exports = router
