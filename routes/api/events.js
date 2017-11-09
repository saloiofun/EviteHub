const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/events"
router.route("/")
  .get(controller.findEventAll)
  .post(controller.creatEvent);


  router.router("/:id")
    .get(controller.findEventById)
    .put(controller.updateEvent)
    .delete(controller.deleteEvent);
