const nodemailer = require('nodemailer')
const crypto = require('crypto')
const db = require('../models')

module.exports = {
  deliverEmail: function (req, res) {
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'evitehubbot@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    })
    let hash = crypto.createHash('md5').update(req.body.to).digest('hex')
    let eventID = '&id=' + req.body.eventId
    var guest = { guestEmail: req.body.to, emailed: true, emailHash: hash, eventId: req.body.eventId }
    req.body.message = req.body.message.replace(/\n/ig, '<br>')
    const mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      html: `<p>${req.body.message}</p> <a href='${req.body.url + hash + eventID}' target='_blank'>Click here for more details.</a>`
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        res.json(error)
      } else {
        db.Guest
        .find({ eventId: req.body.eventId })
        .then(result => {
          let duplicate = false
          for (let i in result) {
            if (result[i].guestEmail === guest.guestEmail) {
              duplicate = true
            }
          }
          if (duplicate) {
            // If guest with email address exist in database we insert hash
            db.Guest
            .findOneAndUpdate({guestEmail: guest.guestEmail, eventId: guest.eventId}, { emailHash: guest.emailHash, emailed: true }, { upsert: true, new: true })
            .then(dbModel => res.json(dbModel))
            .catch(upError => res.status(422).json(upError))
          } else {
            db.Guest
            .create(guest)
            .then(dbModel => {
              // Add new guest to event
              return db.Event.findOneAndUpdate(
                {_id: guest.eventId},
                {$push: {guest: dbModel._id}},
                {new: true}
              )
              .then(dbEventModel => res.json(dbEventModel))
              .catch(errr => res.status(422).json(errr))
            })
            .catch(err => {
              res.status(422).json(err)
            })
          }
        })
        .catch(findErr => {
          res.status(422).json(findErr)
        })
      }
    })
  }
}
