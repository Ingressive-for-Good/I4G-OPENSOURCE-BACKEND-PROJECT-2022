const socketio = require('socket.io')
const server = require('./index')

const io = socketio(server, {
    cors: {
        // change to frontend server
        origin: 'https:localhost:300',
    },
})

let activeUsers = []

// start the socket connection
io.on('connection', (socket) => {
    // add a new user
    socket.on('add-new-user', (userId) => {
        activeUsers.push({ userId, socketId: socket.id })

        io.emit('get-users', activeUsers)
    })

    // user sends a message
    socket.on('send-message', (data) => {
        const { receiverId } = data
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log('Sending from socket to: ', receiverId)
        console.log('Data', data)

        if (user) {
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log('User disconnected', activeUsers)
        io.emit('get-users', activeUsers)
    })
})
