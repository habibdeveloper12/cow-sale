import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { AcademicFecultyValidation } from './academicFeculty.velidation';
import { AcademicFecultyController } from './academicFeculty.controller';

const router = Router();

router.get('/', AcademicFecultyController.getAllAcademicFeculty);

router.get('/:id', AcademicFecultyController.getSingleAcademicFeculty);
router.delete('/:id', AcademicFecultyController.deleteAcademicFeculty);

router.post(
  '/create-faculty',
  validationRequest(AcademicFecultyValidation.createAcademicFecultyZodSchema),
  AcademicFecultyController.useCreateAcademicFeculty
);
router.patch(
  '/:id',
  validationRequest(AcademicFecultyValidation.updateAcademicFecultyZodSchema),
  AcademicFecultyController.updateAcademicFeculty
);
router.delete('/:id', AcademicFecultyController.deleteAcademicFeculty);
export default router;
