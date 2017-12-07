const db = require('../models')

// Defining methods for guest Controller
module.exports = {
  findGuest: function (req, res) {
    db.Guest
      .find({})
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
      // Add new guest to event
      return db.Event.findOneAndUpdate(
        {_id: req.body.eventId},
        {$push: {guest: dbModel._id}},
        {new: true}
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
  },
  findGuestByEvent: function (req, res) {
    db.Event
      .findOne({ _id: req.params.id })
      .populate('guest')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
