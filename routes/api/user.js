const router = require('express').Router()
const userController = require('../../controllers/userController')

// Matches with "/api/user"
router.route('/')
  .get(userController.findAll)
  .post(userController.create)

// router.route('/:username')
//   .get(userController.findUserByEmail)

router.route('/:id')
  .get(userController.findUserById)

module.exports = router
