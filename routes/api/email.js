const router = require('express').Router()
const emailController = require('../../controllers/emailController')

// Matches with "/api/events"
router.route('/')
  .post(emailController.deliverEmail)

module.exports = router
