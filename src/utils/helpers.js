const bcrypt = require('bcrypt')

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

    generateCode: function () {
        return Math.floor(Math.random() * 9000 + 1000)
    },
}
