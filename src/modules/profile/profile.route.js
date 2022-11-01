const express = require('express')
const profileRoute = express.Router()
const {
    getProfile,
    updateProfile,
    deleteAccount,
} = require('./profile.controller')
const upload = require('../../utils/multer')
const multerErrorHandler = require('../../middlewares/multer-errorHandler')
const { auth } = require('../../middlewares/auth.middleware')

profileRoute.get('/', auth, getProfile)
profileRoute.patch(
    '/',
    auth,
    [upload.single('profilePicture'), multerErrorHandler],
    updateProfile
)
profileRoute.delete('/', auth, deleteAccount)

module.exports = profileRoute
