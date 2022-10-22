
const router= require("express")()
const passport = require("passport")

const userController = require("./user.controller")
const {
    inputValidator
} = require("../middlewares/input.validator")
const {
    signUpValidate
} = require("../modules/user.validator")


router.post("/user/signUp", inputValidator(signUpValidate), userController.createUserController)

const { authenticateUser } = require('./user.controller')

const router = require('express').Router()

router.post('/auth', authenticateUser)

module.exports = router