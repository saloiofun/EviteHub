const router = require('express').Router()
const controller = require('../../controllers/guestController')

// Matches with "/api/guests"
router.route('/')
  .get(controller.findGuestAttend)
  .post(controller.createGuest)

// Matches with "/api/guests/:id"
router.route('/:id')
  .get(controller.findGuestById)
  .put(controller.updateGuest)
  .delete(controller.removeGuest)

module.exports = router
