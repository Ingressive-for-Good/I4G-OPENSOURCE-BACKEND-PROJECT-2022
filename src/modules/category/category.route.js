const express = require('express')
const categoryController = require('./category.controller')
const { inputValidator } = require('../../middlewares/input.validator')
const categorySchema = require('./category.validator')

const router = express.Router()

router.post(
    '/',
    inputValidator(categorySchema),
    categoryController.createCategory
)

router.delete('/:categoryId', categoryController.deleteCategory)

module.exports = router
