import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { OrdersValidation } from './orders.velidation';
import { OrdersController } from './orders.controller';

const router = Router();

router.get('/', OrdersController.getAllOrders);

router.get('/:id', OrdersController.getSingleOrders);
router.delete('/:id', OrdersController.deleteOrders);

router.post(
  '/create-faculty',
  validationRequest(OrdersValidation.createOrdersZodSchema),
  OrdersController.useCreateOrders
);
router.patch(
  '/:id',
  validationRequest(OrdersValidation.updateOrdersZodSchema),
  OrdersController.updateOrders
);
router.delete('/:id', OrdersController.deleteOrders);
export default router;
