const mongoose = require('mongoose')
const passport = require('passport')

const { app } = require('./app')
const { logger } = require('./helper/logger')
const { PORT} = require('./utils/config')
const {database, googleOAuth, facebookOAuth} = require("./helper/connect")

database(mongoose)
googleOAuth(passport)
facebookOAuth(passport)


app.listen(PORT, (req, res) => {
    logger.info('server is up and running')
})
 