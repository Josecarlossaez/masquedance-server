const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'masqdancedev@gmail.com',
        pass: 'developermasqdance'
    }
})
module.exports = transporter;