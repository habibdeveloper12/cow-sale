import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { CowsValidation } from './cows.velidation';
import { CowsController } from './cows.controller';

const router = Router();

router.post(
  '/',
  validationRequest(CowsValidation.createCowsZodSchema),
  CowsController.useCreateCows
);

router.get('/', CowsController.getAllCows);

router.get('/:id', CowsController.getSingleCows);
router.delete('/:id', CowsController.deleteCows);
router.patch('/:id', CowsController.updateCows);

// router.patch(
//   '/:id',
//   validationRequest(CowsValidation.updateCowsZodSchema),
//   CowsController.updateCows
// );
router.delete('/:id', CowsController.deleteCows);
export default router;
