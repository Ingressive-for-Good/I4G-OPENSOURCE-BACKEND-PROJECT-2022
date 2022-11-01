const cartService = require('./cart.service')
const { handleResponse } = require('../../utils/helpers')
const productService = require('../product/product.service')

module.exports = {
    getUserCart: async (req, res) => {
        const userId = req.user._id
        try {
            const cart = await cartService.findUserCart(userId)
            if (cart && cart.products.length > 0) {
                return res.status(200).send(handleResponse(cart))
            }
            res.status(404).send({
                success: false,
                message: 'No products found in cart',
            })
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    },
    createCart: async (req, res) => {
        const userId = req.user._id
        try {
            const cart = await cartService.findUserCart(userId)
            const product = await productService.getSingleProduct(
                req.body.productId
            )
            if (!product) {
                return res
                    .status(404)
                    .send({ success: false, message: 'Product not found' })
            }
            const price = product.price
            const name = product.name
            if (cart) {
                const productIndex = cart.products.findIndex(
                    (product) => product.productId == req.body.productId
                )
                if (productIndex > -1) {
                    let myProduct = cart.products[productIndex]
                    myProduct.quantity += req.body.quantity
                    cart.totalPrice = cart.products.reduce((a, x) => {
                        return a + x.quantity * x.price
                    }, 0)
                    cart.products[productIndex] = myProduct
                    await cart.save()
                    return res.status(200).send(handleResponse(cart))
                } else {
                    cart.products.push({
                        productId: req.body.productId,
                        name,
                        quantity: req.body.quantity,
                        price,
                    })
                    cart.totalPrice = cart.products.reduce((a, x) => {
                        return a + x.quantity * x.price
                    }, 0)
                    await cart.save()
                    return res.status(200).send(handleResponse(cart))
                }
            } else {
                const newCart = await cartService.createCart({
                    user: userId,
                    products: [
                        {
                            productId: req.body.productId,
                            name,
                            price,
                            quantity: req.body.quantity,
                        },
                    ],
                    totalPrice: req.body.quantity * price,
                })
                res.status(201).send(handleResponse(newCart))
            }
        } catch (err) {
            res.status(500).send({ success: false, message: err.message })
        }
    },
}
