const router = require('express').Router()
const userRoutes = require('./user')
const eventRoutes = require('./events')

// User routes
router.use('/user', userRoutes)

// Event routes
router.use('/events', eventRoutes)

module.exports = router
