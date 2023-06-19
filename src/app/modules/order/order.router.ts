import { Router } from 'express';
import { OrdersController } from './order.controller';

const router = Router();

router.get('/', OrdersController.getAllOrders);

router.post('/', OrdersController.useCreateOrders);

export default router;
