const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const app = express()
const mongoose = require('mongoose')

const userController = require('./controllers/userController')

// User Authentication
var passport = require('passport')
var Strategy = require('passport-local').Strategy
var expressSession = require('express-session')

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, cb) {
  userController.findUserByEmail(username, function (err, user) {
    if (err) { return cb(err) }
    if (!user) { return cb(null, false) }
    if (user.password != password) { return cb(null, false) }
    return cb(null, user)
  })
}))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  console.log('serialize')
  cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
  console.log('deserialize')
  userController.findUserById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

// Static directory
app.use(express.static('public'))

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({ extended: true }))
// Configure body parser for AJAX requests
app.use(bodyParser.json())
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize())
app.use(passport.session())

app.get('/',
function (req, res) {
  console.log(req)
  console.log('Home Route')
})

app.get('/dashboard',
function (req, res) {
  console.log(req.user)
  console.log('Dashboard Route')
  res.send('In Dashboard Route')
})

app.get('/login',
function (req, res) {
  console.log(req.user)
  console.log('Login Route')
  res.send('login route')
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/failed',
function (req, res) {
  res.send('login failed')
})

app.post('/login',
passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/failed' }),
function (req, res) {
  console.log(req.user._id)
  res.send('login sucess')
  // res.redirect('/')
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(routes)

// Set up promises with mongoose
mongoose.Promise = global.Promise
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/evitehub',
  {
    useMongoClient: true
  }
)

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`)
})
