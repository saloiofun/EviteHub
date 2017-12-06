const db = require('../models')

// Defining methods for guest Controller
module.exports = {
  findGuest: function (req, res) {
    db.Guest
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findGuestByEventId: function (req, res) {
    db.Event
      .find({_id: req.body.eventId})
      .populate('guest')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findGuestById: function (req, res) {
    db.Guest
      .findById({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findGuestByHash: function (req, res) {
    db.Guest
      .findOne({emailHash: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  createGuest: function (req, res) {
    db.Guest
    .create({
      guestName: req.body.guestName,
      guestParty: req.body.guestParty,
      guestEmail: req.body.guestEmail
    })
    .then(dbModel => {
      console.log(dbModel)
      // Add new guest to event
      db.Event.findByIdandupdate(
        req.body.eventID,
        {$push: {guests: dbModel}},
        {upsert: true}
      )
      .then(dbEventModel => res.json(dbEventModel))
      .catch(errr => res.status(422).json(errr))
    })
    .catch(err => res.status(422).json(err))
  },
  updateGuest: function (req, res) {
    db.Guest
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  removeGuest: function (req, res) {
    db.Guest
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
