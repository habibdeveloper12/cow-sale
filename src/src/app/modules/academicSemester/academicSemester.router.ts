import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.velidation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-semester',
  validationRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.useCreateAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemester);

router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

router.patch(
  '/:id',
  validationRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);
export default router;
