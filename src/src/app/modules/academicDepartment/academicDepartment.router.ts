import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.velidation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = Router();

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

router.post(
  '/create-department',
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.useCreateAcademicDepartment
);
router.patch(
  '/:id',
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);
export default router;
