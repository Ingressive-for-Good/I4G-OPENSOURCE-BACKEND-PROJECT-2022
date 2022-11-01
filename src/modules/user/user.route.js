const router = require('express')()

const userController = require('./user.controller')
const { inputValidator } = require('../../middlewares/input.validator')
const { signUpValidate, loginValidate } = require('./user.validator')

router.post(
    '/signUp',
    inputValidator(signUpValidate),
    userController.createUser
)

router.post('/signIn', inputValidator(loginValidate), userController.loginUser)
router.get('signOut', userController.logoutUser)

module.exports = router
