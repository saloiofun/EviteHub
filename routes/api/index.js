const router = require('express').Router()
// const saveRoutes = require('./saves')
const userRoutes = require('./user')

// Save routes
// router.use('/saves', saveRoutes)

// User routes
router.use('/user', userRoutes)

module.exports = router
