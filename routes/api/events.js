const router = require('express').Router()
const controller = require('../../controllers/eventController')

// Matches with "/api/events"
router.route('/')
  .get(controller.findEventAll)
  .post(controller.createEvent)

// Matches with "/api/events/:id"
router.route('/:id')
  .get(controller.findEventById)
  .put(controller.updateEvent)
  .delete(controller.deleteEvent)

// Matches with "/api/events/user/:id"
router.route('/user/:id')
  .get(controller.findEventAllById)

module.exports = router
