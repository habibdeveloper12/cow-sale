import { RequestHandler } from 'express';

import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const createUser: RequestHandler = cerateAsync(async (req, res, next) => {
  const { user } = req.body;
  console.log(req.body);
  console.log(user);
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User had been created',
    success: true,
    data: result,
  });
  next();
});
const getAllUser: RequestHandler = cerateAsync(async (req, res, next) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    success: true,
    data: result,
  });
  next();
});
const updateUser: RequestHandler = cerateAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.updateUser(req.body, id);
  console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User had been updated',
    success: true,
    data: result,
  });
  next();
});
const deleteUser: RequestHandler = cerateAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'HUers deleted successfully',
    success: true,
    data: result,
  });
  next();
});
const getSingleUser: RequestHandler = cerateAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    success: true,
    data: result,
  });
  next();
});

export const userController = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getSingleUser,
};
