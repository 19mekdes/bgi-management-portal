import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const employeeController = new EmployeeController();

router.use(authMiddleware);

// Admin and Manager can view employees
router.get('/', roleMiddleware(['admin', 'manager']), employeeController.getAll);
router.get('/:id', roleMiddleware(['admin', 'manager']), employeeController.getById);

// Admin only for write operations
router.post('/', roleMiddleware(['admin']), employeeController.create);
router.put('/:id', roleMiddleware(['admin']), employeeController.update);
router.delete('/:id', roleMiddleware(['admin']), employeeController.delete);

export default router;