module.exports = (sequelize, Sequelize) => {
    const Travel = sequelize.define("travels", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        departure_date: {
            type: Sequelize.DATE
        },
        arrival_date: {
            type: Sequelize.DATE
        },
        destination_city: {
            type: Sequelize.STRING
        },
        origin_city: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        available_tickets: {
            type: Sequelize.INTEGER
        }
    });

    return Travel;
};