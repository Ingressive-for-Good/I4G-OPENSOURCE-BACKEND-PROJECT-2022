const mongoose = require('mongoose')
const passport = require('passport')
const http = require('http')

const { app } = require('./app')
const { logger } = require('./helper/logger')
const { PORT} = require('./utils/config')
const {database, googleOAuth, facebookOAuth} = require("./helper/connect")

const server = http.createServer(app)

database(mongoose)
googleOAuth(passport)
facebookOAuth(passport)


server.listen(PORT, (req, res) => {
    logger.info('server is up and running')
})

module.exports = server
 