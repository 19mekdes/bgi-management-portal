"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const settingsController = new settings_controller_1.SettingsController();
router.use(auth_middleware_1.authMiddleware);
// User settings (authenticated users)
router.put('/profile', settingsController.updateProfile);
router.post('/change-password', settingsController.changePassword);
router.get('/preferences', settingsController.getPreferences);
router.put('/preferences', settingsController.updatePreferences);
// Admin only: role management
router.put('/users/:id/role', (0, role_middleware_1.roleMiddleware)(['admin']), settingsController.updateUserRole);
exports.default = router;
