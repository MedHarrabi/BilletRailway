const ErrorHandler = require("../utils/errors/ErrorHandler");
const BaseApiController = require("./BaseApiController");

class UserApiController extends BaseApiController {

    constructor({ req, res }) {
        super({
            req,
            res
        });
    }

    async getMe() {
        try {
            const current_user = this.getCurrentUser()
            if (!current_user) {
                throw new ErrorHandler({
                    message: 'Internal server error',
                    statusCode: 500
                })
            }

            return this.response.status(200).send({
                success: true,
                data: current_user,
            })
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

module.exports = UserApiController