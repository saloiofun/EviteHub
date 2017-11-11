const router = require('express').Router()
const controller = require('../../controllers/controller')

// Matches with "/api/events"
router.route('/')
  .get(controller.findEventAll)
  .post(controller.createEvent)

router.route('/:id')
.get(controller.findEventById)
.put(controller.updateEvent)
.delete(controller.deleteEvent)

module.exports = router
