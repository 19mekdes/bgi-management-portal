"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleValidator = exports.changePasswordValidator = exports.updateProfileValidator = exports.resetPasswordValidator = exports.forgotPasswordValidator = exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.forgotPasswordValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.resetPasswordValidator = joi_1.default.object({
    token: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.updateProfileValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    department: joi_1.default.string(),
});
exports.changePasswordValidator = joi_1.default.object({
    currentPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(6).required(),
});
exports.updateRoleValidator = joi_1.default.object({
    role: joi_1.default.string().valid('admin', 'manager', 'staff').required(),
});
