const express = require('express')
const categoryController = require('./category.controller')

const router = express.Router()

router.post(
    '/',
    categoryController.createCategory
)

router.delete('/:categoryId', categoryController.deleteCategory)

module.exports = router
