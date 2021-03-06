const sendEmail = require('../helpers/send-email');

const sendQREmail = (req, res) => {
  if (process.env.NODE_ENV === 'testing') {
    res.send().status(200);
    return;
  }
  const body = req.body;
  sendEmail(body, 'qr-email.hbs', {qrAddress: body.qrAddress}, (err, payload) => {
    if (err) {
      console.log(err, 'Check that the goodgym1000@gmail.com ' +
            'email account has not been suspended/deactivated');
      res.json('Email not sent!');
    } else {
      console.log(payload);
      res.json('Email sent');
    }
  });
};

module.exports = sendQREmail;
