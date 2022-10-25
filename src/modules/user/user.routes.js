const router = require('express').Router()
const passport = require("passport")

const { authenticateUser } = require('./user.controller')
const userController = require("./user.service")
const {
    inputValidator
} = require("../../middlewares/input.validator")
const {
    signUpValidate
} = require("./user.validator")


router.post("/user/signUp", inputValidator(signUpValidate), userController.createUser)

router.post('/auth', authenticateUser)

module.exports = router