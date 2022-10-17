const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { cloudinary } = require('./utils/helpers')
const userRouter = require('./modules/user.routes')
const categoryRoutes = require('./routes/category.route')

const app = express()

app.use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '50kb' }))
    .use(cors())
    .use(helmet())
    .use('/user', userRouter)

app.use('*', cloudinary)

app.use('/categories', categoryRoutes)

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'server works',
    })
})

module.exports = { app }
