const router = require('express').Router()
var passport = require('passport')

router.route('/login')
.get(function (req, res) {
  console.log(req.user)
  console.log('Login Route')
  res.send('login route')
})
.post(passport.authenticate('local', { failureRedirect: '/failed' }),
function (req, res) {
  res.send(req.user)
})

router.route('/logout')
.get(function (req, res) {
  req.logout()
  res.redirect('/')
})

router.route('/failed')
.get(function (req, res) {
  res.send('login failed')
})

module.exports = router
