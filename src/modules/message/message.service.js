const Message = require('./message.model')

exports.sendMessage = async (senderId, content, chatId) => {
    const message = new Message({ sender: senderId, content, chat: chatId })
    await message.save()
    return message
}

exports.getAllChatMessages = async (chatId) => {
    const messages = await Message.find({ chat: chatId })
        .populate({
            path: 'chat',
            populate: {
                path: 'users',
                select: { fullname: 1, email: 1 },
            },
        })
        .sort({ _id: -1 })
    return messages
}
