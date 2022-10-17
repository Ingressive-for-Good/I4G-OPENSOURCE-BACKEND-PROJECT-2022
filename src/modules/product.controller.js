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

            // category.....
        } catch (error) {

        }
    },
    
}

function validateProduct(user, name, categoryId, descriptions, images, price) {
    // this should be fixed in future to return unique errors.
    return user && name && categoryId && descriptions && images && price
}