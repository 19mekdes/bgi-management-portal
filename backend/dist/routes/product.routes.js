"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
router.use(auth_middleware_1.authMiddleware);
// All authenticated users can view products
router.get('/', productController.getAll);
router.get('/low-stock', productController.getLowStock);
router.get('/:id', productController.getById);
// Admin and Manager can modify products
router.post('/', (0, role_middleware_1.roleMiddleware)(['admin', 'manager']), productController.create);
router.put('/:id', (0, role_middleware_1.roleMiddleware)(['admin', 'manager']), productController.update);
router.delete('/:id', (0, role_middleware_1.roleMiddleware)(['admin']), productController.delete);
exports.default = router;
