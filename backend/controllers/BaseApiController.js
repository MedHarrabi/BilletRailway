class BaseApiController {
    request;
    response;

    constructor({req, res}) {
        this.request = req
        this.response = res
    }

    getParams() {
        return this.request.params || {};
    }

    getQueries() {
        return this.request.query || {};
    }

    getBody() {
        return this.request.body || {};
    }

    getBodyField(paramName) {
        return this.getBody()[paramName] || null
    }

    getCurrentUser() {
        return this.request?.user || null
    }

    sendResponseError({ error }) {
        const message = (error && error?.message) ? (error?.message) : 'Fatal error'

        this.response.status(error?.statusCode || 500).send({
            success: false,
            error: message,
        });
    }
}

module.exports = BaseApiController