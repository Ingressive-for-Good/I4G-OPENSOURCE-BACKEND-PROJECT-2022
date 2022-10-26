const mongoose = require('mongoose')
const productService = require('./product.service')
const categoryService = require('../category/category.service')
const { cloudinary } = require('../../utils/helpers')

module.exports = {
    createProduct: async (req, res) => {
        try {
            req.body.images = []
            for (const file of req.files) {
                const imageFile = await cloudinary.uploader.upload(file.path, {
                    folder: 'Products',
                })
                req.body.images.push({
                    url: imageFile.secure_url,
                    public_id: imageFile.public_id,
                })
            }
            if (req.body.images.length === 0) {
                return res
                    .status(400)
                    .send({ message: 'Required fields are missing' })
            }
            const category = await categoryService.findCategoryById(
                req.body.category
            )
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res
                    .status(400)
                    .send({ message: `Invalid id ${category} ` })
            }
            const product = await productService.createProduct(
                req.user,
                req.body
            )
            res.status(201).send(product)
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts()
            res.status(200).send(products)
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
}
