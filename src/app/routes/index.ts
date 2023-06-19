import express from 'express';
import usersRouter from '../../app/modules/users/user.router';
import cowsRouter from '../modules/cows/cows.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: usersRouter,
  },
  {
    path: '/cows',
    router: cowsRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
router.use('users/', usersRouter);
router.use('cows/', cowsRouter);

export default router;
