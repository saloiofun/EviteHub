const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/guests"
router.route("/")
  .get(controller.findGuestAll)
  .post(controller.createGuest);

// Matches with "/api/guests/:id"
router
  .route("/:id")
  .get(controller.findGuestById)
  .put(controller.updateGuest)
  .delete(controller.removeGuest);

module.exports = router;