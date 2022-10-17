const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        interestedUsers: {
            type: Array,
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        isSwappable: {
            type: Boolean,
            default: false,
        },
        condition: {},
        descriptions: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        isAvailable: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
