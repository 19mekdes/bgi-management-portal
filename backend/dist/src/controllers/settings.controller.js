"use strict";
// src/controllers/settings.controller.js
const { SettingsService } = require('../services/settings.service');
const settingsService = new SettingsService();
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, phone, address, position } = req.body;
        const user = await settingsService.updateProfile(userId, {
            name,
            email,
            phone,
            address,
            position
        });
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            });
        }
        const success = await settingsService.changePassword(userId, currentPassword, newPassword);
        if (!success) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({
                success: false,
                message: 'Role is required'
            });
        }
        const user = await settingsService.updateUserRole(userId, role);
        res.json({
            success: true,
            message: 'User role updated successfully',
            user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getPreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const preferences = await settingsService.getPreferences(userId);
        res.json({
            success: true,
            preferences
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updatePreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const { theme, language, notifications } = req.body;
        const preferences = await settingsService.updatePreferences(userId, {
            theme,
            language,
            notifications
        });
        res.json({
            success: true,
            message: 'Preferences updated successfully',
            preferences
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    updateProfile,
    changePassword,
    updateUserRole,
    getPreferences,
    updatePreferences
};
