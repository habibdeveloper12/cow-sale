import { Request, RequestHandler, Response } from 'express';
import { CowsService } from './cows.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  paginationFieldData,
  searchableField,
} from '../../../constants/paginationField';
import { ICows } from './cows.interface';

const useCreateCows: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const { ...cowsData } = req.body;
    const result = await CowsService.createSemester(cowsData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Cows had been created',
      success: true,
      data: result,
    });
  }
);

const getAllCows: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    // const pagination: IPagination = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   shortOrder: req.query.shortOrder,
    //   shortBy: req.query.shortBy,
    // };
    const paginationField = pick(req.query, paginationFieldData);
    const searchTermField = pick(req.query, searchableField);
    const result = await CowsService.getAllSemester(
      paginationField,
      searchTermField
    );

    sendResponse<ICows[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Academic Semester ',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleCows: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CowsService.getSingleSemester(id);

    sendResponse<ICows>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Single Academic Semester  ',
      success: true,
      data: result,
    });
  }
);
const updateCows: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await CowsService.updateCows(id, payload);

    sendResponse<ICows>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Semester Successfully ',
      success: true,
      data: result,
    });
  }
);
const deleteCows: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await CowsService.deleteCows(id);

    sendResponse<ICows>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Semester Successfully ',
      success: true,
      data: result,
    });
  }
);

export const CowsController = {
  useCreateCows,
  getAllCows,
  getSingleCows,
  updateCows,
  deleteCows,
};
