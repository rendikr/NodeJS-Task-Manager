const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = 'x'

sgMail.setApiKey(sendgridAPIkey)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'my@mail.io',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'my@mail.io',
    subject: 'Are you really leaving?',
    text: `It's so sad to see you leave, ${name}. How can we improve things to keep you on the app?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
