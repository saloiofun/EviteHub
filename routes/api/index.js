const router = require('express').Router();
const guestRoutes = require("./guests");
// const saveRoutes = require('./saves')


// Guest routes
router.use("/guests", guestRoutes);


// // Save routes
// router.use('/saves', saveRoutes)

module.exports = router;