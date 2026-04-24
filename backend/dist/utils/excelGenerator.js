"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExcel = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const generateExcel = async (data, sheetName, columns) => {
    const workbook = new exceljs_1.default.Workbook();
    const sheet = workbook.addWorksheet(sheetName);
    sheet.columns = columns;
    data.forEach(row => sheet.addRow(row));
    return workbook.xlsx.writeBuffer();
};
exports.generateExcel = generateExcel;
