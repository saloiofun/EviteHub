const router = require('express').Router()
const guestRoutes = require('./guests')
const eventRoutes = require('./events')

// Guest routes
router.use('/guests', guestRoutes)
router.use('/events', eventRoutes)

// Event routes

module.exports = router
