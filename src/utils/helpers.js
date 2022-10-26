const { v2 } = require('cloudinary')
const bcrypt = require("bcrypt")

const { CLOUD_NAME, API_KEY, API_SECRET } = require('./config')


module.exports = {
    handleResponse: function (payload, message = 'success') {
        return {
            success: true,
            message,
            data: payload || {},
        }
    },
    cloudinary: function (req, res, next) {
            v2.config({
                cloud_name: CLOUD_NAME,
                api_key: API_KEY,
                api_secret: API_SECRET,
            })
            return next()
    },
    hashPassword: function (plainPassword) {
        return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
    },

    generateCode: function () {
      return Math.floor( (Math.random() * 9000) + 1000)
    }
}
