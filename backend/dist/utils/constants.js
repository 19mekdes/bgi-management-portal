"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generatePDF = (title, content) => {
    return new Promise((resolve) => {
        const doc = new pdfkit_1.default();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.fontSize(18).text(title, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(content);
        doc.end();
    });
};
exports.generatePDF = generatePDF;
