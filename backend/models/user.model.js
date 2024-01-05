const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    User.prototype.setPassword_hash = function (password) {
        var salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, salt);
    };

    User.prototype.getPassword_hash = (password) => {
        var salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    };

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    };

    User.prototype.verifyPassword = function (password) {
        
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};