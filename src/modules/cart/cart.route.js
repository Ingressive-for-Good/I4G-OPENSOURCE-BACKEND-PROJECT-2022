const express = require('express')
const { getUserCart, createCart } = require('./cart.controller')
const { auth } = require('../../middlewares/auth.middleware')

const router = express.Router()

router.post('/', auth, createCart)
router.get('/', auth, getUserCart)

module.exports = router
