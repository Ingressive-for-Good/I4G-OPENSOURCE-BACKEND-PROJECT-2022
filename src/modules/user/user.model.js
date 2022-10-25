
const {Schema, model}= require("mongoose")

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unqiue: true
    },
    profilePicture: {
        imgUrl: String,
        imdId: String
    },
    role: {
        type: String,
        enum: ['user', 'superAdmin', 'admin'],
        default: 'user',
    }
}, {timestamps: true})

const User = model("user", userSchema)

module.exports = User
