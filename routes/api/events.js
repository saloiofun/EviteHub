const router = require('express').Router()
const controller = require('../../controllers/eventController')

// Matches with "/api/events"
router.route('/')
  .get(controller.findEventAll)
  .post(controller.createEvent)

router.route('/:id')
  .get(controller.findEventById)
  .put(controller.updateEvent)
  .delete(controller.deleteEvent)

router.route('/user/:id')
  .get(controller.findEventAllById)

module.exports = router
