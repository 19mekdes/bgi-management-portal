"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("../services/settings.service");
const auth_validator_1 = require("../validators/auth.validator");
const settingsService = new settings_service_1.SettingsService();
class SettingsController {
    async updateProfile(req, res) {
        const userId = req.user.id;
        const { error, value } = auth_validator_1.updateProfileValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await settingsService.updateProfile(userId, value);
        res.json(user);
    }
    async changePassword(req, res) {
        const userId = req.user.id;
        const { error, value } = auth_validator_1.changePasswordValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const success = await settingsService.changePassword(userId, value.currentPassword, value.newPassword);
        if (!success) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        res.json({ message: 'Password changed successfully' });
    }
    async updateUserRole(req, res) {
        const userId = Number(req.params.id);
        const { error, value } = auth_validator_1.updateRoleValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const user = await settingsService.updateUserRole(userId, value.role);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    async getPreferences(req, res) {
        const userId = req.user.id;
        const preferences = await settingsService.getPreferences(userId);
        res.json(preferences);
    }
    async updatePreferences(req, res) {
        const userId = req.user.id;
        const preferences = await settingsService.updatePreferences(userId, req.body);
        res.json(preferences);
    }
}
exports.SettingsController = SettingsController;
