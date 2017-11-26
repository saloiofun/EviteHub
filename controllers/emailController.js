var nodemailer = require('nodemailer')

module.exports = {
  deliverEmail: function (req, res) {
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'evitehubbot@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    })
    const mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: `${req.body.message}\n Click on link for more details: ${req.body.url}`
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error)
        res.json(error)
      } else {
        console.log('Email sent')
        res.json(response)
      }
    })
  }
}
