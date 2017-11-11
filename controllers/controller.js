const db = require('../models')

// Defining methods for the Controller
module.exports = {
  findEventById: function(req,res) {
    db.Event
      .findById({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findEventAll: function(req, res) {
    db.Event
      .find({})
      .then(dbModel => res.json( dbModel ))
      .catch(err => res.status( 422 ).json( err ));
  },
  createEvent: function(req, res) {
    console.log(req);
    db.Event
      .create(req.body)
      .then(dbModel => res.json( dbModel ))
      .catch(err => res.status( 422 ).json( err ));
  },
  updateEvent: function(req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json( dbModel ))
      .catch(err => res.status( 422 ).json( err ));
  },
  deleteEvent: function(req, res) {
    db.Event
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json( dbModel ))
      .catch(err => res.status( 422 ).json( err ));
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
