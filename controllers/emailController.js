var nodemailer = require('nodemailer')
var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: '[ENTER EMAIL HERE]',
    pass: '[ENTER EMAIL PASSWORD]'
  }
})

module.exports = {
  deliverEmail: function (req, res) {
    const mailOptions = {
      to: req.body.to,
      subject: 'Event Invitation',
      text: `${req.body.user} has invited you to ${req.body.event}!\n Click on link for more details: ${req.body.url}`
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent')
      }
    })
  }
}
