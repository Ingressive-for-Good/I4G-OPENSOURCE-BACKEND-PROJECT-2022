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



module.exports = router