const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// this define how to send mail
let transporter = nodemailer.createTransport(env.smtp);

// template of which mail would be sent
let renderTemplate = function (data, relativePath) {
    let mailHTML;
    ejs.renderFile(path.join(
        __dirname, '../views/mailers', relativePath
    ), data, function (err, template) {
        if (err) {
            console.log('error in rendering template', err)
            return;
        }
        mailHTML = template;
    }
    )
    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}