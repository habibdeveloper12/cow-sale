import { Router } from 'express';
import validationRequest from '../../middleware/validationRequest';
import { StudentValidaion } from './student.velidation';
import { StudentController } from './student.controller';

const router = Router();

// router.post(
//   '/create-student',
//   validationRequest(StudentValidation.createStudentZodSchema),
//   StudentController.useCreateStudent
// );

router.get('/', StudentController.getAllStudents);

router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validationRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);
export default router;
