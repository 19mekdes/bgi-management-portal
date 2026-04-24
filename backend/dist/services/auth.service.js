"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const email_service_1 = require("./email.service");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    async login(email, password) {
        const employee = await database_1.default.employee.findUnique({ where: { email } });
        if (!employee)
            return null;
        const valid = await (0, bcrypt_1.comparePassword)(password, employee.password);
        if (!valid)
            return null;
        const token = (0, jwt_1.generateToken)(employee.id, employee.role);
        const { password: _, ...user } = employee;
        return { token, user };
    }
    async forgotPassword(email) {
        const employee = await database_1.default.employee.findUnique({ where: { email } });
        if (!employee)
            return;
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        await database_1.default.employee.update({
            where: { email },
            data: { resetToken, resetTokenExpiry },
        });
        await (0, email_service_1.sendResetEmail)(email, resetToken);
    }
    async resetPassword(token, newPassword) {
        const employee = await database_1.default.employee.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        });
        if (!employee)
            return false;
        const hashed = await (0, bcrypt_1.hashPassword)(newPassword);
        await database_1.default.employee.update({
            where: { id: employee.id },
            data: { password: hashed, resetToken: null, resetTokenExpiry: null },
        });
        return true;
    }
}
exports.AuthService = AuthService;
