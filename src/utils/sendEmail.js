import nodemailer from "nodemailer";
import dotenv from "dotenv/config"

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;
const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

// const data = {
//     from: UKR_NET_EMAIL,
//     to: "coldfellow20111@gmail.com",
//     subject: "test send",
//     html: "<h1>Hello Dear<h1>"
// }

export const sendEmail = dat => {
    const email = { ...dat, form: UKR_NET_EMAIL }
    return transporter.sendMail(email);
}
