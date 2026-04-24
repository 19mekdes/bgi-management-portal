import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const dashboardController = new DashboardController();

router.use(authMiddleware);

// Role-specific dashboard stats
router.get('/admin', roleMiddleware(['admin']), dashboardController.getAdminStats);
router.get('/manager', roleMiddleware(['manager']), dashboardController.getManagerStats);
router.get('/staff', roleMiddleware(['staff']), dashboardController.getStaffStats);

// Shared dashboard data (filtered by role in service)
router.get('/attendance-trend', dashboardController.getAttendanceTrend);
router.get('/product-stock', dashboardController.getProductStockDistribution);
router.get('/recent-activities', dashboardController.getRecentActivities);

export default router;