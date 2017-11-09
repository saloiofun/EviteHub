const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  guestName: { type: String, required: true },
  guestParty: { type: String, required: true },
  guestEmail: { type: String, required: true },
  attend: { type: Boolean, default: false },
  comment: string
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;