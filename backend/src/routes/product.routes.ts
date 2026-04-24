import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const productController = new ProductController();

router.use(authMiddleware);

// All authenticated users can view products
router.get('/', productController.getAll);
router.get('/low-stock', productController.getLowStock);
router.get('/:id', productController.getById);

// Admin and Manager can modify products
router.post('/', roleMiddleware(['admin', 'manager']), productController.create);
router.put('/:id', roleMiddleware(['admin', 'manager']), productController.update);
router.delete('/:id', roleMiddleware(['admin']), productController.delete);

export default router;