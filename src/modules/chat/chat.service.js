const Chat = require('./chat.model')

exports.createChat = async (senderId, receiverId) => {
    const chat = new Chat({ users: [senderId, receiverId] }).populate('users', [
        'fullname',
        'email',
    ])
    await chat.save()
    return chat
}

exports.getUserChats = async (userId) => {
    const chats = await Chat.find({
        users: { $elemMatch: { $eq: userId } },
    })
        .populate('users', ['fullname', 'email'])
        .sort({ _id: -1 })
    return chats
}

exports.findChat = async (senderId, receiverId) => {
    const chat = await Chat.findOne({
        users: { $all: [senderId, receiverId] },
    }).populate('users', ['fullname', 'email'])
    return chat
}
