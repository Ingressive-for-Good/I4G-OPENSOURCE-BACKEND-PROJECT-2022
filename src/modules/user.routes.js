const { authenticateUser } = require('./user.controller')

const router = require('express').Router()

router.post('/auth', authenticateUser)

module.exports = router