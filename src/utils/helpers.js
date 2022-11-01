const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

module.exports = {
    handleResponse: function (payload, message = 'success') {
        return {
            success: true,
            message,
            data: payload || {},
        }
    },

    hashPassword: function (plainPassword) {
        return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
    },

    isPasswordMatch: function (plainPassword, userPassword) {
        return bcrypt.compareSync(plainPassword, userPassword)
    },

    generateCode: function () {
        return Math.floor(Math.random() * 9000 + 1000)
    },

    generateToken: function (userId) {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
    },
}
