const router = require('express').Router();
const guestRoutes = require("./guests");
const eventRoutes = require("./events");
// const saveRoutes = require('./saves')


// Guest routes
router.use("/guests", guestRoutes);


// Event routes
router.use("./events", eventRoutes);

// // Save routes
// router.use('/saves', saveRoutes)

module.exports = router;