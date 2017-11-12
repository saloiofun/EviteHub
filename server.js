const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const app = express()
const mongoose = require('mongoose')

// User Authentication
var passport = require('passport')

var expressSession = require('express-session')
var cookieParser = require('cookie-parser')

// Static directory
app.use(express.static('public'))

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
// Configure body parser for AJAX requests
app.use(bodyParser.json())
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize())
app.use(passport.session())
require('./passport/passport.js')(passport)

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
