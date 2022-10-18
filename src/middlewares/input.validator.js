const { clientError } = require("../utils/error")
const {logger} = require("../helper/logger")

 function inputValidator (schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body)

        const {error, result} = validation
 
        if (error) {
            logger.info(error)
            
            throw new clientError(error, 406)
        }

        return next()
    }
 }

 module.exports = { inputValidator }