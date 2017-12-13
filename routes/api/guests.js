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

// Matches with "/api/guests/rsvp/:hash/:id"
router.route('/rsvp/:hash/:id')
  .get(controller.findGuestByHash)

  // Matches with "/api/guests/event/:id"
router.route('/event/:id')
.get(controller.findGuestByEvent)

module.exports = router
