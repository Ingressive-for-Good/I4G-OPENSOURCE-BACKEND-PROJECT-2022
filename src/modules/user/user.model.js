const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        googleId: String,
        facebookId: String,
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            unqiue: true,
        },
        address: {
            type: String,
        },
        profilePicture: {
            imgUrl: String,
            imgId: String,
        },
        role: {
            type: String,
            enum: ['user', 'sub admin', 'admin'],
            default: 'user',
        },
        accountNumber: {
            type: Number,
            trim: true,
        },
        accountName: String,
        bank: String,
    },
    { timestamps: true }
)

userSchema.set('toJSON', {
    transform: (doc, { password, ...userData }, options) => userData,
})

const User = model('user', userSchema)

module.exports = User
