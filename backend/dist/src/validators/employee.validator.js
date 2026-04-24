"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeValidator = exports.createEmployeeValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEmployeeValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid('admin', 'manager', 'staff').default('staff'),
    department: joi_1.default.string(),
});
exports.updateEmployeeValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    email: joi_1.default.string().email(),
    role: joi_1.default.string().valid('admin', 'manager', 'staff'),
    department: joi_1.default.string(),
});
