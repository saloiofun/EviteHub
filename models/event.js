const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  guests: [{
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest'
    }
  }]

})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
