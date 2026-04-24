import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const reportController = new ReportController();

router.use(authMiddleware);
router.use(roleMiddleware(['admin', 'manager'])); // Only admin and manager can access reports

router.get('/attendance', reportController.getAttendanceReport);
router.get('/attendance/export', reportController.exportAttendanceReport);
router.get('/inventory', reportController.getInventoryReport);
router.get('/inventory/export', reportController.exportInventoryReport);
router.get('/employees', reportController.getEmployeeReport);
router.get('/employees/export', reportController.exportEmployeeReport);

export default router;