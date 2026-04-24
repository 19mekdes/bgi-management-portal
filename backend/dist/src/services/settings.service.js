"use strict";
// src/services/settings.service.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
class SettingsService {
    async updateProfile(userId, userData) {
        try {
            const { name, email, phone, address, position } = userData;
            const user = await prisma.employee.update({
                where: { id: parseInt(userId) },
                data: {
                    name: name || undefined,
                    email: email || undefined,
                    phone: phone || undefined,
                    address: address || undefined,
                    position: position || undefined
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    department: true,
                    position: true,
                    phone: true,
                    address: true,
                    isActive: true,
                    createdAt: true
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await prisma.employee.findUnique({
                where: { id: parseInt(userId) }
            });
            if (!user) {
                throw new Error('User not found');
            }
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid) {
                return false;
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.employee.update({
                where: { id: parseInt(userId) },
                data: { password: hashedPassword }
            });
            return true;
        }
        catch (error) {
            throw new Error(`Failed to change password: ${error.message}`);
        }
    }
    async updateUserRole(userId, role) {
        try {
            const user = await prisma.employee.update({
                where: { id: parseInt(userId) },
                data: { role },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    department: true,
                    isActive: true
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(`Failed to update user role: ${error.message}`);
        }
    }
    async getPreferences(userId) {
        return {
            theme: 'light',
            language: 'en',
            notifications: {
                email: true,
                attendanceReminders: true,
                lowStockAlerts: true,
                weeklyReports: true
            },
            dashboardLayout: 'default'
        };
    }
    async updatePreferences(userId, preferences) {
        console.log(`Updating preferences for user ${userId}:`, preferences);
        return {
            ...preferences,
            updatedAt: new Date()
        };
    }
}
module.exports = { SettingsService };
