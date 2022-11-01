const mongoose = require('mongoose')
const productService = require('./product.service')
const categoryService = require('../category/category.service')
const cloudinary = require('../../utils/cloudinary')
const { handleResponse } = require('../../utils/helpers')
const { logger } = require('../../helper/logger')

module.exports = {
    createProduct: async (req, res) => {
        if (
            !req.body.name ||
            !req.body.description ||
            !req.body.price ||
            !req.body.condition
        ) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing',
            })
        }
        try {
            if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
                return res
                    .status(400)
                    .send({ success: false, message: 'Invalid category id' })
            }
            const category = await categoryService.findCategoryByIdService(
                req.body.category
            )
            if (!category) {
                return res
                    .status(404)
                    .send({ success: false, message: 'Category not found' })
            }
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
            req.body.user = req.user._id
            const product = await productService.createProduct(req.body)
            res.status(201).json(handleResponse(product))
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
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
    deleteProduct: async (req, res) => {
        const { productId } = req.params
        const user = req.user._id

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res
                .status(400)
                .send({ success: false, message: 'Invalid product ID' })
        }
        try {
            const product = await productService.getSingleProduct(productId)

            if (!product) {
                return res
                    .status(404)
                    .send({ success: false, message: 'Product not found' })
            }
            if (product.user.toString() !== user.toString()) {
                return res
                    .status(401)
                    .send({ success: false, message: 'Not Authorized' })
            }
            const imageIds = product.images.map((image) => image.public_id)
            if (imageIds.length > 0) {
                imageIds.forEach(async (id) => {
                    await cloudinary.uploader.destroy(id)
                })
            }
            await productService.deleteProduct(productId)
            res.status(200).json(handleResponse({}))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
    updateProduct: async (req, res) => {
        const { productId } = req.params
        if (
            !req.body.name ||
            !req.body.description ||
            !req.body.price ||
            !req.body.condition
        ) {
            return res.status(400).send({
                success: false,
                message: 'Required fields are missing',
            })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res
                .status(400)
                .send({ success: false, message: 'Invalid product ID' })
        }
        try {
            const product = await productService.getSingleProduct(productId)
            const user = req.user._id
            if (!product) {
                return res
                    .status(404)
                    .send({ success: false, message: 'Product not found' })
            }
            if (product.user.toString() !== user.toString()) {
                return res
                    .status(401)
                    .send({ success: false, message: 'Not Authorized' })
            }

            req.body.images = []
            const imageIds = product.images.map((image) => image.public_id)
            if (req.files) {
                if (imageIds.length > 0) {
                    imageIds.forEach(async (id) => {
                        await cloudinary.uploader.destroy(id)
                    })
                }

                for (const file of req.files) {
                    const imageFile = await cloudinary.uploader.upload(
                        file.path,
                        {
                            folder: 'Products',
                        }
                    )
                    req.body.images.push({
                        url: imageFile.secure_url,
                        public_id: imageFile.public_id,
                    })
                }
            } else {
                req.body.images.push(...product.images)
            }
            if (req.body.images.length === 0) {
                return res
                    .status(400)
                    .send({
                        success: false,
                        message: 'Images field are required',
                    })
            }
            try {
                const p = await productService.updateSingleProduct(
                    productId,
                    req.body
                )

                return res.status(200).send(
                    handleResponse({
                        ...p._doc,
                        info: 'successfully updated product',
                    })
                )
            } catch (err) {
                return res.status(500).send({ ...err, message: err.message })
            }
        } catch (err) {
            return res.status(500).send({ message: err.message })
        }
    },
    hasImages: async (req, res, next) => {
        if (!req.files) {
            next()
        }
    },
    getSingleProduct: async (req, res) => {
        const { productId } = req.params
        try {
            const product = await productService.getProductById(productId)
            if (!product)
                return res.status(404).send({
                    success: false,
                    message: `Product with id:${productId} doesn't exist`,
                })

            res.status(200).json(handleResponse(product))
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
}
