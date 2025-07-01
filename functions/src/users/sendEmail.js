import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        //fake email goes here:
        user: 'fbmailsender123@gmail.com',
        pass: 'mseucutoktyxddfu'
    }
});

export const sendEmail = ({ to, from, subject, message }) => {
    const mailOptions = {
        to,
        from,
        subject,
        text: message
    };

    return transporter.sendMail(mailOptions);
}

