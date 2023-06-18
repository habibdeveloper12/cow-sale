import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { createZodUserSchema } from './user.velidation';
import { UserService } from './user.service';
import { userController } from './user.controller';

const router = Router();

router.post(
  '/create-user',
  validationRequest(createZodUserSchema),
  userController.useCreateUser
);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getSingleUser);

export default router;
