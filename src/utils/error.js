class baseError extends Error {
    success
    errorName
    statusCode
    errMessage
}

 class clientError extends baseError {
    constructor(errmessage, statuscode) {
        super()
        this.success = false
        this.errorName = 'client error'
        this.errMessage = errmessage
        this.statusCode = statuscode
    }
}

 class serverError extends baseError {
    constructor(errmessage, statuscode) {
        super()
        this.success = false
        this.errorName = 'server error'
        this.errMessage = errmessage
        this.statusCode = statuscode
    }
}


module.exports = {
    clientError,
    serverError
}