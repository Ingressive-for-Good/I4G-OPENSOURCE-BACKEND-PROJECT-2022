const router = require('express').Router()
const { createChat, getUserChats, findChat } = require('./chat.controller')

router.post('/', createChat)
router.get('/:userId', getUserChats)
router.get('/find/:senderId/:receiverId', findChat)

module.exports = router
