"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const employeeController = new employee_controller_1.EmployeeController();
// All routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Admin and Manager can view employees
router.get('/', (0, role_middleware_1.roleMiddleware)(['admin', 'manager']), employeeController.getAll);
router.get('/:id', (0, role_middleware_1.roleMiddleware)(['admin', 'manager']), employeeController.getById);
// Admin only for write operations
router.post('/', (0, role_middleware_1.roleMiddleware)(['admin']), employeeController.create);
router.put('/:id', (0, role_middleware_1.roleMiddleware)(['admin']), employeeController.update);
router.delete('/:id', (0, role_middleware_1.roleMiddleware)(['admin']), employeeController.delete);
exports.default = router;
