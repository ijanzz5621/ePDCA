'use strict';
const nodemailer = require('nodemailer');
var credentials = require('../credentials');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: credentials.email.host,
    port: credentials.email.port,
    secure: credentials.email.secure, // secure:true for port 465, secure:false for port 587
    auth: credentials.email.auth
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"ePDCA Admin" <admin@epdca.com>', // sender address
    to: '', // list of receivers
    subject: '', // Subject line
    text: '', // plain text body
    html: '' // html body
};

function setMailOptions(to, subject, text, html) {
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.text = text;
    mailOptions.html = html;
}

function sendMail() {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = {
    setMailOptions: setMailOptions,
    sendMail: sendMail

}