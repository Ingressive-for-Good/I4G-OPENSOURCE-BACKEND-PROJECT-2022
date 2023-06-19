const mongoose = require('mongoose')
const chatService = require('./chat.service')
const { handleResponse } = require('../../utils/helpers')

module.exports = {
    createChat: async (req, res) => {
        const { senderId, receiverId } = req.body

        if (!senderId || !receiverId) {
            return res
                .status(400)
                .send({ message: 'ID of sender or receiver is missing' })
        }
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).send({ message: 'Invalid sender id' })
        }

        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).send({ message: 'Invalid receiver id' })
        }

        try {
            const chat = await chatService.createChat(
                senderId,
                receiverId
            )
            res.status(201).json(handleResponse(chat))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },

    /**
     * It finds all the chats that have the logged in user's id in the users array and populates the users array with
     * the name and email of the users.
     */

    getUserChats: async (req, res) => {
        const { userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid user ID' })
        }
        try {
            const chats = await chatService.getUserChats(userId)

            if (chats.length === 0) {
                return res.status(200).send({ message: 'User has no chats' })
            }
            res.status(200).json(handleResponse(chats))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },

    findChat: async (req, res) => {
        const { senderId, receiverId } = req.params

        if (!mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).send({ message: 'Invalid sender id' })
        }

        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).send({ message: 'Invalid receiver id' })
        }

        try {
            const chat = await chatService.findChat(senderId, receiverId)
            res.status(200).json(handleResponse(chat))
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    },
}
