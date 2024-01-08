
const db = require("../models");
const ErrorHandler = require("../utils/errors/ErrorHandler");
const BaseApiController = require("./BaseApiController");

class ReservationApiController extends BaseApiController {

    constructor({ req, res }) {
        super({
            req,
            res
        });
    }

    async find() {
        try {
            const {
                accepted
            } = this.getQueries()

            const items = []
            if (accepted) {
                if (accepted === 'false') {

                    const _reservations = await db.reservation.findAll({
                        where: {
                            is_accepted: false
                        }
                    })

                    if (!_reservations?.length) {
                        return this.response.status(204).send({
                            success: true,
                            message: 'No reservations yet'
                        })
                    }

                    for (const reservation of _reservations) {

                        const booker_user = await db.user.findByPk(reservation.user_id);
                        const booked_travel = await db.travel.findByPk(reservation.travel_id)

                        items.push({
                            id: reservation.id,
                            username: booker_user.username,
                            email: booker_user.email,
                            origin_city: booked_travel.origin_city,
                            destination_city: booked_travel.destination_city,
                            departure_date: booked_travel.departure_date,
                            arrival_date: booked_travel.arrival_date,
                            price: booked_travel.price
                        })
                    }

                    return this.response.status(200).send({
                        success: true,
                        message: 'Not accepted reservations',
                        items
                    })
                } else if (accepted === 'true') {
                    const _reservations = await db.reservation.findAll({
                        where: {
                            is_accepted: true
                        }
                    })

                    if (!_reservations?.length) {
                        return this.response.status(204).send({
                            success: true,
                            message: 'No reservations yet'
                        })
                    }

                    for (const reservation of _reservations) {

                        const booker_user = await db.user.findByPk(reservation.user_id);
                        const booked_travel = await db.travel.findByPk(reservation.travel_id)

                        items.push({
                            id: reservation.id,
                            username: booker_user.username,
                            email: booker_user.email,
                            origin_city: booked_travel.origin_city,
                            destination_city: booked_travel.destination_city,
                            departure_date: booked_travel.departure_date,
                            arrival_date: booked_travel.arrival_date,
                            price: booked_travel.price
                        })
                    }

                    return this.response.status(200).send({
                        success: true,
                        message: 'Accepted reservations',
                        items
                    })
                }
            } else {
                const _reservations = await db.reservation.findAll();

                if (!_reservations?.length) {
                    return this.response.status(204).send({
                        success: true,
                        message: 'No reservations yet'
                    })
                }

                for (const reservation of _reservations) {

                    const booker_user = await db.user.findByPk(reservation.user_id);
                    const booked_travel = await db.travel.findByPk(reservation.travel_id)

                    items.push({
                        id: reservation.id,
                        is_accepted: reservation.is_accepted,
                        username: booker_user.username,
                        email: booker_user.email,
                        origin_city: booked_travel.origin_city,
                        destination_city: booked_travel.destination_city,
                        departure_date: booked_travel.departure_date,
                        arrival_date: booked_travel.arrival_date,
                        price: booked_travel.price
                    })
                }
                return this.response.status(200).send({
                    success: true,
                    message: 'All reservations',
                    items
                })
            }
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
            const {
                id,
                is_accepted
            } = this.getBody()
            if (!id || is_accepted) {
                throw new ErrorHandler({
                    statusCode: 400,
                    message: 'Missing parameters'
                })
            }

            const reservation = await db.reservation.findByPk(id);
            const travel = await db.travel.findByPk(reservation.travel_id)

            if (!reservation) {
                throw new ErrorHandler({
                    message: `This reservation with id ${id} doesn't exists.`,
                    statusCode: 404
                })
            }
            reservation.is_accepted = is_accepted;
            travel.available_tickets--;
            await travel.save()
            await reservation.save();

            return this.response.status(200).send({
                success: true,
                message: `Reservation id ${id} is accepted succesfully!`
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

    async delete() {
        try {
            const { id } = this.getParams()

            const reservation = await db.reservation.findByPk(id)

            if (!reservation) {
                throw new ErrorHandler({
                    message: `This reservation with id ${id} doesn't exists.`,
                    statusCode: 404
                })
            }

            delete reservation.user_id;
            delete reservation.travel_id;

            await reservation.destroy();

            return this.response.status(200).send({
                success: true,
                message: `Reservation id ${id} deleted successfully!`,
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

    async create() {
        try {
            const {
                travel_id
            } = this.getBody()
            const current_user = this.getCurrentUser();
            if (!current_user || !Number(travel_id)) {
                throw new ErrorHandler({
                    statusCode: 400,
                    message: 'Missing travel_id parameter'
                })
            }

            const reservation = await db.reservation.create({
                travel_id,
                user_id: current_user.id,
                is_accepted: false
            })

            if (!reservation) {
                throw new ErrorHandler({
                    statusCode: 500,
                    message: 'Reservation is failed!'
                })
            }

            return this.response.status(201).send({
                success: true,
                message: 'Travel is booked succesfully!'
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

module.exports = ReservationApiController