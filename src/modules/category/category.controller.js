const mongoose = require('mongoose')
const categoryService = require('./category.service')
const { handleResponse } = require('../../utils/helpers')

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const category = await categoryService.findCategoryService(name)
        if (category) {
            return res
                .status(400)
                .send({ message: `Category ${category.name} already exists` })
        }

        const newCategory = await categoryService.createCategoryService(
            req.body
        )
        res.status(201).json(handleResponse(newCategory))
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).send({ message: `Invalid id ${categoryId} ` })
    }

    try {
        const category = await categoryService.findCategoryByIdService(
            categoryId
        )

        if (!category) {
            return res
                .status(404)
                .send({ message: `Category ${categoryId} not found` })
        }
        await categoryService.deleteCategoryService(categoryId)
        res.status(201).json(handleResponse({}))
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
