const router = require('express').Router()
const controller = require('../../controllers/guestController')

// Matches with "/api/guests"
router.route('/')
  .get(controller.findGuest)
  .post(controller.createGuest)

// Matches with "/api/guests/:id"
router.route('/:id')
  .get(controller.findGuestById)
  .put(controller.updateGuest)
  .delete(controller.removeGuest)

// Matches with "api/guests/event/:id"
router.route('/event/:id')
  .get(controller.findGuestByEventId)

// Matches with "/api/guests/rsvp/:id"
router.route('/rsvp/:id')
  .get(controller.findGuestByHash)

module.exports = router
