const mongoose = require('mongoose')
const messageService = require('./message.service')
const { handleResponse } = require('../../utils/helpers')

module.exports = {
    sendMessage: async (req, res) => {
        const { senderId, content, chatId } = req.body
        if (!content || !chatId || !senderId) {
            return res.status(400).send('Required fields are missing')
        }
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).send({ message: 'Invalid chat ID' })
        }
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).send({ message: 'Invalid sender ID' })
        }
        try {
            const message = await messageService.sendMessage(
                senderId,
                content,
                chatId
            )
            res.status(201).json(handleResponse(message))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },

    getAllChatMessages: async (req, res) => {
        const { chatId } = req.params
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).send({ message: 'Invalid chat ID' })
        }
        try {
            const messages = await messageService.getAllChatMessages(chatId)
            res.status(200).json(handleResponse(messages))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
}
