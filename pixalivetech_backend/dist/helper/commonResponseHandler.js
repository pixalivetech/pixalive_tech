"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.sendReferralCode = exports.sendEmailOtp = exports.transporter = exports.sendOtp = exports.sendEmail = exports.response = void 0;
exports.generate = generate;
const logs_controller_1 = require("../controller/logs.controller");
const logs_model_1 = require("../model/logs.model");
const axios_1 = __importDefault(require("axios"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const response = (req, res, activity, level, method, success, statusCode, result, message, extendedMessage) => {
    const LogsData = new logs_model_1.Logs();
    const date = new Date();
    LogsData.activity = activity;
    LogsData.userId = req.body?.loginId || "";
    LogsData.url = req.baseUrl || "";
    LogsData.time = date.getTime();
    LogsData.date = date;
    LogsData.level = level;
    LogsData.description = message;
    LogsData.method = method;
    LogsData.processStatus = statusCode === 200;
    (0, logs_controller_1.saveLog)(LogsData);
    res.status(statusCode).json({
        success,
        result: result || "",
        message: message || "",
        extendedMessage: extendedMessage || "",
        statusCode,
    });
};
exports.response = response;
const sendEmail = async (contact) => {
    var sender = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    var composemail = {
        from: process.env.EMAIL_USER,
        replyTo: contact.email,
        to: "pixalivetech@gmail.com",
        subject: `PixaliveTech Website Contact: ${contact.subject}`,
        text: `
            Name: ${contact.name}
            Email: ${contact.email}
            Mobile Number: ${contact.mobileNumber}
            Subject: ${contact.subject}
            Message: ${contact.message}
        `,
    };
    sender.sendMail(composemail, function (error, info) {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Mail sent successfully:", info.response);
        }
    });
};
exports.sendEmail = sendEmail;
// Function to generate random string
function generate(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
const sendOtp = async (mobileNumber, otp) => {
    const url = `https://2factor.in/API/V1/2372fa0e-5edd-11eb-8153-0200cd936042/SMS/+91${mobileNumber}/${otp}`;
    await axios_1.default.get(url).catch((err) => {
        console.error(`Error sending OTP: ${err.message}`);
    });
};
exports.sendOtp = sendOtp;
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
let sendEmailOtp = async (email, otp) => {
    if (!email)
        throw new Error("Email is not registered");
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",
        text: `Your verification OTP: ${otp}`,
    };
    await exports.transporter.sendMail(mailOptions).catch((err) => {
        console.error("Error sending OTP email:", err);
    });
};
exports.sendEmailOtp = sendEmailOtp;
let sendReferralCode = async (email, referralCode) => {
    if (!email)
        throw new Error("Email is not registered");
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Join with us",
        text: `Use my referral code: ${referralCode}`,
    };
    return await exports.transporter.sendMail(mailOptions).catch((err) => {
        console.error("Error sending referral code email:", err);
    });
};
exports.sendReferralCode = sendReferralCode;
let formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};
exports.formatDate = formatDate;
exports.default = {
    response: exports.response,
    sendEmail: exports.sendEmail,
    generate,
    sendOtp: exports.sendOtp,
    sendEmailOtp: exports.sendEmailOtp,
    sendReferralCode: exports.sendReferralCode,
    formatDate: exports.formatDate,
};
