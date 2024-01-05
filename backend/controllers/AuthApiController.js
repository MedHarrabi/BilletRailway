const db = require("../models");
const Roles = require("../utils/enums/roles");
const ErrorHandler = require("../utils/errors/ErrorHandler");
const generateTokenForUser = require("../utils/jwt/jwt_generator");
const BaseApiController = require("./BaseApiController");
const validator = require('validator')

class AuthApiController extends BaseApiController {

    constructor({ req, res }) {
        super({
            req,
            res
        });
    }

    async signin() {
        try {
            let { username, password } = this.getBody()

            const email = String(username).trim().toLowerCase()
            password = String(password).trim()

            if (!email || !validator.isEmail(email)) {
                throw new ErrorHandler({
                    message: `Email is required with valid format.`,
                    statusCode: 400
                })
            } else if (!password || !validator.isLength(password, {
                min: 6
            })) {
                throw new ErrorHandler({
                    message: `Password is required with at least 6 characters.`,
                    statusCode: 400
                })
            }

            const user = await db.user.findOne({
                where: {
                    email
                }
            })
            const is_pwd_verified = user.verifyPassword(password)
            if (!user || !is_pwd_verified) {
                throw new ErrorHandler({
                    message: 'The email address or password is incorrect',
                    statusCode: 400,
                })
            }

            const token = generateTokenForUser({ user })

            return this.response.status(200).send({
                success: true,
                user,
                token
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

    async signup() {
        try {
            const {
                username,
                email,
                password,
                role
            } = this.getBody()

            if (!email || !validator.isEmail(email)) {
                throw new ErrorHandler({
                    message: `Email is required with valid format.`,
                    statusCode: 400
                })
            } else if (!username || !validator.isLength(username, {
                min: 4,
                max: 20
            })) {
                throw new ErrorHandler({
                    message: `Username is required with min length 4 and max length 20.`,
                    statusCode: 400
                })
            } else if (!password || !validator.isLength(password, {
                min: 6
            })) {
                throw new ErrorHandler({
                    message: `Password is required with at least 6 characters.`,
                    statusCode: 400
                })
            } else if (!role) {
                role = Roles.User
            }

            const user = await db.user.findOne({
                where: {
                    email,
                },
            });

            if (user) {
                throw new ErrorHandler({
                    message: `This mail address is already existed`,
                    statusCode: 400
                })
            }
            const new_user = await db.user.create({
                username: username.toLowerCase(),
                password: password.trim(),
                email: email.toLowerCase(),
                role
            })

            if (!new_user) {
                throw new ErrorHandler({
                    message: `User doesn't created in the database`,
                    statusCode: 500
                })
            }
            new_user.setPassword_hash(new_user.password);
            const token = await generateTokenForUser({
                user: new_user
            })
            
            return this.response.status(201).send({
                success: true,
                user: new_user,
                token
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

module.exports = AuthApiController