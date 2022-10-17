const User = require('./user.model')
const Product = require('../models/product.model')
const Category = require('../models/category.model')

module.exports = {
    createProducts: async (req, res) => {
        try {
            const user = req.user // user must be loggend in to perform this request.
            const { name, categoryId, descriptions, images, price } = req.body
            const categoryObj = await Category.findOne({ _id: categoryId })
            const validProduct = validateProduct(user, name, categoryObj, descriptions, images, price)
            if (validProduct) {
               await Product.exists({ name })
                    .then(exist => {
                        if (!exist) {
                            const product = new Product({ 
                                ...req.body,
                                user: user._id,
                                name, 
                                category: categoryId, 
                                descriptions, 
                                images, 
                                price 
                            })
                            product.save()
                                .then(saved=>{
                                    res.status(201).json({...saved, message: "product created"})
                                })
                                .catch(err=>{
                                    return res.status(501).json({
                                        message: "Could not save product.",
                                        status: 404,
                                        ...err
                                    })
                                })
                        } else {
                            return res.status(409).json({
                                message: "Product with name already exist.",
                                status: 409
                            })
                        }
                        
                    })
            } else {
                return res.status(404).json({
                    message: "Missing required fields.",
                    status: 404
                })
            }
        } catch (error) {
            return res.status(501).json({
                message: "Could not save product.",
                status: 404,
                ...error
            })
        }
    },

    deleteSingleProduct: async(req, res)=>{
        const {productId} = req.params
        try {
            await Product.deleteOne({_id: productId})
                .then(deleted=>{
                    res.status(201).json({
                        ...deleted,
                        message: "product has been deleted.",
                        status: 201
                    })
                })
        } catch (error) {
            return res.status(501).json({
                message: "Could not delete product.",
                status: 404,
                ...error
            })  
        }
    },

    interestedProducts: async (req, res) => {
        const user = req.user
        try {
            await Product.find({user: user._id})
                .lean()
                .select("name category interestedUsers")
                .then(result=>{
                    return res.status(200).json(result)
                })
                .catch(err=>{
                    return res.status(501).json({
                        message: "Could not fetch products.",
                        status: 404,
                        ...err
                    })
                })         
        } catch (error) {
            return res.status(501).json({
                message: "Could not get products.",
                status: 404,
                ...error
            }) 
        }
        
    }
}

function validateProduct(user, name, categoryId, descriptions, images, price) {
    // this should be fixed in future to return unique errors.
    return user && name && categoryId && descriptions && images && price
}