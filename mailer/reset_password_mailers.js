const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');

exports.resetPassword = function (user) {
  
    let htmlString = nodemailer.renderTemplate({ user : user }, '/resetPassword/reset_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'nitishyadav169@gmail.com',
        to: user.email,
        subject: 'password has been reset',
        html: htmlString
    }, function (err, info) {
        if (err) { console.log('error in sending mail', err); return; }
        console.log('Message Sent', info);
        return;
    });
}