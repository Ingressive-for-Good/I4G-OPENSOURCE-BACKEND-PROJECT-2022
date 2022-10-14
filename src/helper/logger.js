const {createLogger, format, transports} = require("winston")

const {printf, combine, colorize, errors, timestamp} = format

const logFormat = printf( ({level, timestamp, message, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`
})

const logger = createLogger({
    level: "info",
    format: combine(
        colorize(),
        errors({ stack: true }),
        timestamp(),
        logFormat
    ),
    transports: [ new transports.Console() ]
})

module.exports = {logger}