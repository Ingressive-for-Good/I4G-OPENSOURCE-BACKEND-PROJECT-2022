const Category = require('../models/category.model')

exports.createCategoryService = async (categoryData) => {
    const category = new Category({ ...categoryData })
    await category.save()
    return category
}

exports.deleteCategoryService = async (categoryId) => {
    return await Category.findByIdAndRemove({ _id: categoryId })
}

exports.findCategoryService = async (categoryName) => {
    return await Category.findOne({ name: categoryName }).exec()
}

exports.findCategoryByIdService = async (categoryId) => {
    return await Category.findById({ _id: categoryId }).exec()
}
