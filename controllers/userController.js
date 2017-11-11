const db = require('../models')

module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err))
  },
  findUserByEmail: function (req, res) {
    db.User
      .findOne({ email: req.params.username })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err))
  },
  findUserById: function (req, res) {
    db.User
      .findOne({ _id: req.params.id })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err))
  }
}
