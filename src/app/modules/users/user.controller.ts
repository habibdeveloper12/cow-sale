import { RequestHandler } from 'express';
import { createUser } from './user.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
export const useCreateUser: RequestHandler = cerateAsync(
  async (req, res, next) => {
    const { user } = req.body;
    const result = await createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Semester had been created',
      success: true,
      data: result,
    });
    next();
  }
);
