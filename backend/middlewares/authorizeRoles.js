const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                throw new ErrorHandler({
                    message: `Role (${req.user.role}) is not allowed to access this ressource `,
                    statusCode: 403
                })
            }
            next()
        } catch (error) {
            res.status(error?.statusCode || 403).send({
                success: false,
                error: error.message,
            });
        }
    }
}

module.exports = authorizeRoles;