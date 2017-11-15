const db = require('../models')

// Defining methods for the Controller
module.exports = {
  findGuestAttend: function (req, res) {
    db.Guest
      .find({ rsvp: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  createGuest: function (req, res) {
    db.Guest
    .create(req.body)
    .then(dbModel => res.json(dbModel))
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
  findEventById: function (req, res) {
    db.Event
      .findById({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findEventAll: function (req, res) {
    db.Event
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  createEvent: function (req, res) {
    console.log(req)
    db.Event
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  updateEvent: function (req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  deleteEvent: function (req, res) {
    db.Event
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  createTodo: function (req, res) {
    db.Todo
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  updateTodo: function (req, res) {
    db.Todo
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  removeTodo: function (req, res) {
    db.Todo
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findAllTodo: function (req, res) {
    db.Todo
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findDoneTodo: function (req, res) {
    db.Todo
      .find({ todoDone: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findUndoneTodo: function (req, res) {
    db.Todo
      .find({ todoDone: false })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
