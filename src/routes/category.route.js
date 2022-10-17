const express = require('express')
const { body } = require('express-validator')
const categoryController = require('../controllers/category.controller')
const BodyValidationMiddleware = require('../common/middlewares/body.validation.middleware')

const router = express.Router()

router.post(
    '/',
    body('name').isString(),
    BodyValidationMiddleware.verifyFieldsErrors,
    categoryController.createCategory
)

router.delete('/:categoryId', categoryController.deleteCategory)

module.exports = router
