import { Router } from 'express';
// import validationRequest from '../../middleware/validationRequest';
// import { createZodUserSchema } from './user.velidation';
import { userController } from './user.controller';

const router = Router();

router.post('/sign-up', userController.createUser);
router.patch('/:id', userController.updateUser);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getSingleUser);
router.delete('/:id', userController.deleteUser);
// router.get('/', userController.getAllUser);
// router.get('/:id', userController.getSingleUser);

export default router;
