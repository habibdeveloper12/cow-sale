import express from 'express';
import usersRouter from '../../app/modules/users/user.router';
import academicSemesterRouter from '../../app/modules/academicSemester/academicSemester.router';
import academicDepartmentRouter from '../../app/modules/academicDepartment/academicDepartment.router';
import academicFacultyRouter from '../../app/modules/academicFeculty/academicFeculty.router';
import studentRouter from '../../app/modules/student/student.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: usersRouter,
  },
  {
    path: '/academic-semester',
    router: academicSemesterRouter,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRouter,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRouter,
  },
  {
    path: '/student',
    router: studentRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
router.use('users/', usersRouter);
router.use('academic-semester/', academicSemesterRouter);
router.use('academic-department/', academicDepartmentRouter);
router.use('academic-faculty/', academicFacultyRouter);
router.use('student/', studentRouter);
export default router;
