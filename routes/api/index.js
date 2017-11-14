const router = require('express').Router()
const guestRoutes = require('./guests')
const userRoutes = require('./user')
const eventRoutes = require('./events')
const todoRoutes = require('./todos')
const emailRoutes = require('./email')

// Guest routes
router.use('/guests', guestRoutes)

// User routes
router.use('/user', userRoutes)

// Event routes
router.use('/events', eventRoutes)

// Todo routes
router.use('/todos', todoRoutes)
// Email route
router.use('/email', emailRoutes)

module.exports = router
