const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        accountNumber: {
            type: String,
        },
        bank: {
            type: String,
        },
        cart: {
            type: Array,
            default: [],
        },
        role: {
            enum: ['user', 'sub-admin', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}

const User = mongoose.model('User', userSchema)

module.exports = User
