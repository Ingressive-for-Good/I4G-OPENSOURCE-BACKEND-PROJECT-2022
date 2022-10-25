
const router= require("express")()
const passport = require("passport")

const { authenticateUser } = require('./user.controller')
const userController = require("./user.controller")
const {
    inputValidator
} = require("../../middlewares/input.validator")
const {
    signUpValidate
} = require("./user.validator")


router.post("/user/signUp", inputValidator(signUpValidate), userController.createUser)

router.post('/signIn', authenticateUser)

module.exports = router