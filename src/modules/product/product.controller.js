const mongoose = require('mongoose')
const productService = require('./product.service')
const categoryService = require('../category/category.service')
const cloudinary = require('../../utils/cloudinary')
const { handleResponse } = require('../../utils/helpers')

module.exports = {
    createProduct: async (req, res) => {
        if (
            !req.body.name ||
            !req.body.description ||
            !req.body.price ||
            !req.body.condition
        ) {
            return res
                .status(400)
                .send({ message: 'Required fields are missing' })
        }
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
                    .send({ message: 'Images field are required' })
            }
            if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
                return res.status(400).send({ message: 'Invalid category id' })
            }
            const category = await categoryService.findCategoryById(
                req.body.category
            )
            if (!category) {
                return res.status(404).send({ message: 'Category not found' })
            }
            const product = await productService.createProduct(
                req.body.user,
                req.body
            )
            res.status(201).json(handleResponse(product))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts()
            res.status(200).json(handleResponse(products))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },

    getSingleProduct: async (req, res) => {
        const { id } = req.params
        try {
            const product = await productService.getProductById(id)
            if (!product)
                return res.status(404).send({
                    success: false,
                    message: `Product with id:${id} doesn't exist`,
                })

            res.status(200).json(handleResponse(product))
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
}
