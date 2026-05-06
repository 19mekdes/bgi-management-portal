import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const attendanceController = new AttendanceController();

router.use(authMiddleware);

router.post('/checkin', attendanceController.checkIn);
router.post('/checkout', attendanceController.checkOut);
router.get('/today-status', attendanceController.getTodayStatus);
router.get('/my-stats', attendanceController.getMyStats);


router.get('/', roleMiddleware(['admin', 'manager']), attendanceController.getAll);

export default router;