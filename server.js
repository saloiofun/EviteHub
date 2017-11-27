const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const PORT = process.env.PORT || 3001
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({path: '.env.development.local'})


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }))
// Configure body parser for AJAX requests
app.use(bodyParser.json())

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
