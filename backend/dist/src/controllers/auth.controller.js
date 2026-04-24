"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validator_1 = require("../validators/auth.validator");
const authService = new auth_service_1.AuthService();
class AuthController {
    async login(req, res) {
        const { error, value } = auth_validator_1.loginValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const result = await authService.login(value.email, value.password);
        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json(result);
    }
    async forgotPassword(req, res) {
        const { error, value } = auth_validator_1.forgotPasswordValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        await authService.forgotPassword(value.email);
        res.json({ message: 'If an account exists with that email, you will receive a reset link.' });
    }
    async resetPassword(req, res) {
        const { error, value } = auth_validator_1.resetPasswordValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const success = await authService.resetPassword(value.token, value.password);
        if (!success) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        res.json({ message: 'Password reset successfully' });
    }
}
exports.AuthController = AuthController;
