const jwt = require('jsonwebtoken')
const config = require('../../config/auth.config')

const generateTokenForUser = async ({ user, options = {} } = { user: {}, options: {} }) => {
    let data = {
        ...{
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }, ...options
    };

    return  await jwt.sign(data, process.env.JWT_SECRET || config.JWT_SECRET, {
        expiresIn: '8600m',
    });
}

module.exports = generateTokenForUser