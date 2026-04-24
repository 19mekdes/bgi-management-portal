"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
exports.emailService = {
    async sendPasswordResetEmail(email, token) {
        const resetLink = `${config_1.config.frontendUrl}/reset-password?token=${token}`;
        const transporter = nodemailer_1.default.createTransport({
            host: config_1.config.smtpHost,
            port: config_1.config.smtpPort,
            secure: false,
            auth: {
                user: config_1.config.smtpUser,
                pass: config_1.config.smtpPass,
            },
        });
        const mailOptions = {
            from: `"Beer Factory" <${config_1.config.smtpUser}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`,
        };
        await transporter.sendMail(mailOptions);
    },
};
