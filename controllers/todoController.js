const db = require('../models')

// Defining methods for the Controller
module.exports = {
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
