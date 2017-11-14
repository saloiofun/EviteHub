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
  findUserByEmail: function (username, cb) {
    db.User
      .findOne({ email: username })
      .then(dbUser => cb(null, dbUser))
      .catch(err => cb(null, null))
  },
  findUserById: function (id, cb) {
    db.User
      .findOne({ _id: id })
      .then(dbUser => cb(null, dbUser))
      .catch(err => cb(new Error('User ' + id + ' does not exist')))
  }
}
