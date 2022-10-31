const express = require('express')
const { sendMessage, getAllChatMessages } = require('./message.controller')

const router = express.Router()

router.post('/', sendMessage)
router.get('/:chatId', getAllChatMessages)

module.exports = router
