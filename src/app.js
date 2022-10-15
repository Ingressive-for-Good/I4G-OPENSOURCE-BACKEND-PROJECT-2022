const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { cloudinary } = require('./utils/helpers')

const app = express()

app.use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '50kb' }))
    .use(cors())
    .use(helmet())

app.use('*', cloudinary)

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'server works',
    })
})

module.exports = { app }
