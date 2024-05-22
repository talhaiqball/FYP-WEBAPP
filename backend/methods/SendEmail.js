var nodemailer = require('nodemailer');

function sendEmail(recipient, subject, text){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'fypgiftwebapp@gmail.com',
            pass: 'kkfcbdxvaydsispi'
        }
    });
    
    var mailOptions = {
      from: 'fypgiftwebapp@gmail.com',
      to: recipient,
      subject: subject,
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = sendEmail