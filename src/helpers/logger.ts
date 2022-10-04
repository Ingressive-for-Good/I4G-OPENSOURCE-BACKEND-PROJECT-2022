import winston, {createLogger, format, transports} from "winston" 

const {printf, combine, colorize, errors, timestamp} = format

const logFormat = printf( ({level, timestamp, message, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`
})

export const logger = createLogger({
    level: "info",
    format: combine(
        colorize(),
        errors({ stack: true }),
        timestamp(),
        logFormat
    ),
    transports: [ new transports.Console() ]
})