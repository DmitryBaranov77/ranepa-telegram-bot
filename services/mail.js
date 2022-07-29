const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function sendEmail(text){
    transporter.sendMail({
        from: '"TGBOT" <baranov_dima2000@mail.ru>',
        to: 'zyzychka1@gmail.com',
        subject: 'Вопрос из телеги',
        text: text
    });
}

module.exports = sendEmail;