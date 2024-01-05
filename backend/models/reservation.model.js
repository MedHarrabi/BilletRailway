module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        travel_id: {
            type: Sequelize.INTEGER
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });

    return Reservation;
};