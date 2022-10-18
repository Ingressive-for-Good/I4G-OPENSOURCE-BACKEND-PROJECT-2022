const Joi = require("joi")

const { validator } = require("../utils/helpers")

const signUpValidate = Joi.object({
    fullname: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().trim().min(8).required()
})

module.exports = {
    signUpValidate
}