const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const guestSchema = new Schema({
  guestName: { type: String },
  guestParty: { type: String },
  guestEmail: { type: String, required: true, unique: true },
  emailHash: { type: String },
  rsvp: { type: Boolean, default: false },
  emailed: { type: Boolean, default: false },
  comment: String
})

guestSchema.plugin(uniqueValidator)

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest
