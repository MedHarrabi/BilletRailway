
const ErrorHandler = require("../utils/errors/ErrorHandler");
const BaseApiController = require("./BaseApiController");

class TravelApiController extends BaseApiController {

    constructor({ req, res }) {
        super({
            req,
            res
        });
    }

    async find() {
        try {
            // TODO: find travels by arrival_date and deaparture_date

        } catch (error) {
            return this.sendResponseError({
                error: new ErrorHandler({
                    message: error.message,
                    statusCode: error.statusCode
                })
            })
        }
    }

    async update() {
        try {
            // TODO: update travel by id
        } catch (error) {
            return this.sendResponseError({
                error: new ErrorHandler({
                    message: error.message,
                    statusCode: error.statusCode
                })
            })
        }
    }

    async delete() {
        try {
            // TODO: delete travel by id
        } catch (error) {
            return this.sendResponseError({
                error: new ErrorHandler({
                    message: error.message,
                    statusCode: error.statusCode
                })
            })
        }
    }

    async create() {
        try {
            // TODO: create travel 
        } catch (error) {
            return this.sendResponseError({
                error: new ErrorHandler({
                    message: error.message,
                    statusCode: error.statusCode
                })
            })
        }
    }
}

module.exports = TravelApiController