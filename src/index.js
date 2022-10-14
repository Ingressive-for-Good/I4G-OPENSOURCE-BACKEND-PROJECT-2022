const mongoose = require("mongoose")

const {app} = require("./app")
const { logger } = require("./helper/logger")
const {PORT, DB_URI}= require("./utils/config")

mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( () => {
    logger.info("connected to the database successfully")
} ).catch( (err) => {
    logger.info(err)
} )

app.listen(PORT, (req, res) => {
    logger.info("server is up and running")
})
