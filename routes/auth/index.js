const router = require('express').Router()
var passport = require('passport')

router.route('/dashboard')
.get(function (req, res) {
  console.log(req.user)
  console.log('Dashboard Route')
  res.send('In Dashboard Route')
})

router.route('/login')
.get(function (req, res) {
  console.log(req.user)
  console.log('Login Route')
  res.send('login route')
})
.post(passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/failed' }),
function (req, res) {
  console.log(req.user._id)
  res.send('login sucess')
  // res.redirect('/')
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
