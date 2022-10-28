const express = require('express')
const profileRoute = express.Router()
const {
    getProfile,
    updateProfile,
    deleteAccount,
} = require('./profile.controller')

//User must be signed it to access profile
//Todo - Add authorization middleware here

profileRoute.get('/', getProfile)
profileRoute.patch('/', updateProfile)
profileRoute.delete('/', deleteAccount)

module.exports = profileRoute
