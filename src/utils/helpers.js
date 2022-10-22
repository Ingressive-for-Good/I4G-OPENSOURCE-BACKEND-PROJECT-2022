const { v2 } = require('cloudinary')
const bcrypt = require("bcrypt")

const { CLOUD_NAME, API_KEY, API_SECRET } = require('./config')


function handleResponse(payload, message = 'success') {
    return {
        success: true,
        message,
        data: payload || {},
    }
}

function cloudinary(req, res, next) {
    v2.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
    })
    return next()
}

function hashPassword (plainPassword) {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
}

module.exports = {
    handleResponse,
    cloudinary,
    hashPassword
}
