"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendMail = async ({ to, subject, message = '', html = null }, from = null) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 485,
        secure: true,
        auth: {
            user: 'mailer9861@gmail.com',
            pass: 'blfx zkik ymck xihv',
        },
    });
    let mailOptions = {
        from: !!from
            ? from
            : {
                name: 'My Pregnancy',
                address: 'rsvp@mypregnancyarabia.com',
            },
        to: [to],
        subject: subject,
    };
    if (!!html) {
        const emailTemplatePath = path_1.default.join(__dirname, '../../templates', html);
        const emailTemplate = fs_1.default.readFileSync(emailTemplatePath, 'utf-8');
        mailOptions = { ...mailOptions, html: emailTemplate };
    }
    else {
        mailOptions = { ...mailOptions, text: message };
    }
    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.default = sendMail;
//# sourceMappingURL=sendMail.js.map