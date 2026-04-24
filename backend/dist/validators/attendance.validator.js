"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceQueryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.attendanceQueryValidator = joi_1.default.object({
    employeeId: joi_1.default.number().integer().positive(),
    startDate: joi_1.default.date().iso(),
    endDate: joi_1.default.date().iso(),
});
