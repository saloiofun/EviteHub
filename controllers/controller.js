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
  deliverEmail: function(req, res) {
    const mailOptions={
      to : req.body.to,
      subject : "Event Invitation",
      text : `${req.body.user} has invited you to ${req.body.event}!\n Click on link for more details: ${req.body.url}`
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
     }else{
            console.log("Email sent");
         }
    });
  }
}
