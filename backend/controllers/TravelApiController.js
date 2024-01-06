
const ErrorHandler = require("../utils/errors/ErrorHandler");
const BaseApiController = require("./BaseApiController");
const validator = require('validator')
const db = require('../models/')
const { Op } = require('sequelize')
const {
    DEFAULT_AVAILABLE_SEATS
} = require('../utils/constants/values.json')

class TravelApiController extends BaseApiController {

    constructor({ req, res }) {
        super({
            req,
            res
        });
    }
    // DONE
    async find() {
        try {
            // TODO: find travels by arrival_city and deaparture_city and deaparture_date
            const {
                arrival_city,
                departure_city,
                departure_date
            } = this.getQueries()

            if (arrival_city || departure_city || validator.isDate(departure_date)) {
                const travels = await db.travel.findAll({
                    where: {
                        [Op.substring]: {
                            arrival_city,
                            departure_city,
                            departure_date
                        }
                    }
                })

                return this.response.status(200).send({
                    success: true,
                    travels
                })
            } else {
                const travels = await db.travel.findAll();

                return this.response.status(200).send({
                    success: true,
                    travels
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
    // DONE
    async update() {
        try {
            const {
                id,
                departure_date,
                arrival_date,
                destination_city,
                origin_city,
                price,
                available_tickets
            } = this.getBody()


            const travel = await db.travel.findByPk(id);

            if (!travel) {
                throw new ErrorHandler({
                    message: `This travel with id ${id} doesn't exists.`
                })
            }

            const updated_travel = await travel.update({
                departure_date,
                arrival_date,
                destination_city,
                origin_city,
                price,
                available_tickets
            })

            return this.response.status(200).send({
                success: true,
                message: `Travel id ${id} updated successfully!`,
                data: updated_travel
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
    // DONE
    async delete() {
        try {
            const { id } = this.getParams()

            const travel = await db.travel.findByPk(id)

            if (!travel) {
                throw new ErrorHandler({
                    message: `This travel with id ${id} doesn't exists.`
                })
            }

            await travel.destroy();

            return this.response.status(200).send({
                success: true,
                message: `Travel id ${id} deleted successfully!`,
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
    // DONE
    async create() {
        try {
            const {
                departure_date,
                arrival_date,
                destination_city,
                origin_city,
                price,
                available_tickets
            } = this.getBody()

            if (validator.isEmpty(destination_city)) {
                throw new ErrorHandler({
                    message: 'destination is required',
                    statusCode: 400
                })
            } else if (validator.isEmpty(origin_city)) {
                throw new ErrorHandler({
                    message: 'origin is required',
                    statusCode: 400
                })
            } else if (validator.isEmpty(departure_date)) {
                throw new ErrorHandler({
                    message: 'origin is required',
                    statusCode: 400
                })
            }

            const new_travel = await db.travel.create({
                departure_date,
                arrival_date,
                destination_city,
                origin_city,
                price,
                available_tickets: available_tickets || DEFAULT_AVAILABLE_SEATS
            })

            return this.response.status(201).send({
                success: true,
                message: 'Travel created successfully',
                data: new_travel
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

module.exports = TravelApiController