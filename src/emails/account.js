const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.SENDGRID_MAIL_FROM,
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.SENDGRID_MAIL_FROM,
    subject: 'Are you really leaving?',
    text: `It's so sad to see you leave, ${name}. How can we improve things to keep you on the app?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
