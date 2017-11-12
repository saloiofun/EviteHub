const router = require('express').Router()
const guestRoutes = require('./guests')
const userRoutes = require('./user')
const eventRoutes = require('./events')
const todoRoutes = require('./todos')

// Guest routes
router.use('/guests', guestRoutes)

// User routes
router.use('/user', userRoutes)

// Event routes
router.use('/events', eventRoutes)

// Todo routes
router.use('/todos', todoRoutes)

module.exports = router
