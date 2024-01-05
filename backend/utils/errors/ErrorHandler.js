class ErrorHandler extends Error {
    statusCode;

    constructor({ message, statusCode } = { message: 'Internal server error', statusCode: 500 }) {
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler