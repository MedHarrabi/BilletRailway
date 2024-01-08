

const AuthApiController = require('../controllers/AuthApiController')
const UserApiController = require('../controllers/UserApiController')
const ReservationApiController = require('../controllers/ReservationApiController')
const TravelApiController = require('../controllers/TravelApiController')
const Roles = require('../utils/enums/roles')
const isAuthenticatedUser = require('../middlewares/auth')
const authorizeRoles = require('../middlewares/authorizeRoles')
const apiRouter = require('express').Router();

// auth routes
apiRouter.post('/auth/signin',
    async (req, res) => await new AuthApiController({ req, res }).signin())

apiRouter.post('/auth/signup',
    async (req, res) => await new AuthApiController({ req, res }).signup())

// user routes
apiRouter.get('/user/me', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    async (req, res) => await new UserApiController({ req, res }).getMe())

// reservation routes
apiRouter.get('/reservations', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin),
    async (req, res) => await new ReservationApiController({ req, res }).find())

apiRouter.post('/reservation/create', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    async (req, res) => await new ReservationApiController({ req, res }).create())

apiRouter.put('/reservation/update', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin),
    async (req, res) => await new ReservationApiController({ req, res }).update())

apiRouter.delete('/reservation/delete/:id', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin),
    async (req, res) => await new ReservationApiController({ req, res }).delete())

// travel routes
apiRouter.get('/travels', /* async (req, res, next) => await isAuthenticatedUser(req, res, next), */
    async (req, res) => await new TravelApiController({ req, res }).find())

apiRouter.post('/travel/create', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin), async (req, res) => await new TravelApiController({ req, res }).create())

apiRouter.put('/travel/update', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin), async (req, res) => await new TravelApiController({ req, res }).update())

apiRouter.put('/travel/find/:id', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin), async (req, res) => await new TravelApiController({ req, res }).findOne())

apiRouter.delete('/travel/delete/:id', async (req, res, next) => await isAuthenticatedUser(req, res, next),
    authorizeRoles(Roles.Admin), async (req, res) => await new TravelApiController({ req, res }).delete())

module.exports = apiRouter;
