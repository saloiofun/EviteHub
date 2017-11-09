const db = require('../models')

// Defining methods for the Controller
module.exports = {
  findGuestAttend :function(req, res) {
    db.Guest
      .find({ attend: true })
      .sort({_id: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findGuestAll: function(req, res) {
    db.Guest
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findGuestById: function(req, res) {
    db.Guest
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createGuest: function(req, res) {
    db.Guest
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateGuest: function(req, res) {
    db.Guest
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeGuest: function(req, res) {
    db.Guest
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
//   findAll: function (req, res) {
//     db.Saved
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err))
//   },
//   create: function (req, res) {
//     db.Saved
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err))
//   }
}
