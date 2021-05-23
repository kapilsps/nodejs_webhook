const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var express = require('express');
var router = express.Router();


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "",
    pass: ""
  }
});

const sendmail = (data) => {
  ejs.renderFile(path.join(__dirname, '..', 'views', 'email.ejs'), { data }, (err, str) => {
    var mailOptions = {
      to: 'sendtome@mail.com',
      from: 'default@mail.com',
      subject: 'DB hooks',
      html: str
    };
    transport.sendMail(mailOptions);
    return;
  });
};


router.post('/send-email', (req, res, next) => {
  console.log(req.body);
  sendmail(req.body);
  return ;
});

module.exports = router;
