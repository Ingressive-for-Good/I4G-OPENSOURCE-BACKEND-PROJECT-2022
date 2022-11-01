const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                    required: true,
                },
                price: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
