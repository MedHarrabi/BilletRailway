const ErrorHandler = require('../utils/errors/ErrorHandler')
const db = require('../models/')
const authConfig = require('../config/auth.config')
const jwt = require('jsonwebtoken')
//const Role = require('../utils/enums/roles')

const isAuthenticatedUser = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization?.substring(7)

        if (!token) {
            throw new ErrorHandler({
                message: "You are unauthorized to access this resource",
                statusCode: 401
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || authConfig.JWT_SECRET)
        const current_user = await db.user.findByPk(decoded.id)

        if (!current_user) {
            throw new ErrorHandler({
                message: `user doesn't exists with this id ${decoded.id} `,
                statusCode: 500
            })
        }

        delete current_user.created_at;
        delete current_user.updatedAt;
        
        req.user = current_user
        next()
    } catch (error) {
        res.status(error?.statusCode || 401).send({
            success: false,
            error: "You are unauthorized to access this resource",
        });
    }
}

module.exports = isAuthenticatedUser