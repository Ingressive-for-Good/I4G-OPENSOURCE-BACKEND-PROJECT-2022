class baseError extends Error {
    protected success!: boolean
    protected errorName!: string
    statusCode!: string
    errMessage!: string
}

export class clientError extends baseError {
    constructor (errmessage: string, statuscode) {
        super()
        this.success = false
        this.errorName = "client error"
        this.errMessage = errmessage
        this.statusCode = statuscode
    }
}

export class serverError extends baseError {
    constructor (errmessage: string, statuscode) {
        super()
        this.success = false
        this.errorName = "server error"
        this.errMessage = errmessage
        this.statusCode = statuscode
    }
}