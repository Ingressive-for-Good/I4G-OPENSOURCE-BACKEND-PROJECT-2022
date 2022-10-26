const nodemailer = require("nodemailer");
const { logger } = require("../helper/logger");
const {
    mailtrapUsername,
    mailtrapPassword
} = require("./config")

exports.sendEmail = async (url, options) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: mailtrapUsername,
        pass: mailtrapPassword
        },
    })

    let mailoptions = {
        from: '"techMart" mustaphaamidatoyindamola@gmail.com',
        to: options.email,
        subject: options.subject,
        html: `
        <p> ${options.message}</>
        <span> ${options.text1}</span> 
        <a href=${url}">verification code</a> 
        
        <span> ${options.text2} <span>`
    }

    transporter.sendMail(mailoptions, function (err, info) {
        if (err) return logger.info(err)

        return logger.info(info)
    })
}