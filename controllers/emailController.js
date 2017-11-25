var nodemailer = require('nodemailer')

var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'evitehubbot@gmail.com',
    pass: ['Enter Passwordf Here']
  }
})

module.exports = {
  deliverEmail: function (req, res) {
    const mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: `${req.body.message}\n Click on link for more details: ${req.body.url}`
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
