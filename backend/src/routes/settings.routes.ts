import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const settingsController = new SettingsController();

router.use(authMiddleware);

// User settings (authenticated users)
router.put('/profile', settingsController.updateProfile);
router.post('/change-password', settingsController.changePassword);
router.get('/preferences', settingsController.getPreferences);
router.put('/preferences', settingsController.updatePreferences);

// Admin only: role management
router.put('/users/:id/role', roleMiddleware(['admin']), settingsController.updateUserRole);

export default router;