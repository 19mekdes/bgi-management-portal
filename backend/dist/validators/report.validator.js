"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceReportValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.attendanceReportValidator = joi_1.default.object({
    startDate: joi_1.default.date().iso().required(),
    endDate: joi_1.default.date().iso().required(),
    employeeId: joi_1.default.number().integer().positive(),
});
