import { Request, RequestHandler, Response } from 'express';
import { AcademicDepartmentService } from './academicDepartment.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  paginationFieldData,
  searchableField,
} from '../../../constants/paginationField';
import { IAcademicDepartment } from './academicDepartment.interface';

const useCreateAcademicDepartment: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData
    );
    console.log(
      academicDepartmentData,
      'DFdfdfdfdff jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Department had been created',
      success: true,
      data: result,
    });
  }
);

const getAllAcademicDepartment: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    // const pagination: IPagination = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   shortOrder: req.query.shortOrder,
    //   shortBy: req.query.shortBy,
    // };
    const paginationField = pick(req.query, paginationFieldData);
    const searchTermField = pick(req.query, searchableField);
    const result = await AcademicDepartmentService.getAllDepartment(
      paginationField,
      searchTermField
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Academic Department ',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleAcademicDepartment: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Single Academic Department  ',
      success: true,
      data: result,
    });
  }
);
const updateAcademicDepartment: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      payload
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Department Successfully ',
      success: true,
      data: result,
    });
  }
);
const deleteAcademicDepartment: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.deleteAcademicDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Department Successfully ',
      success: true,
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  useCreateAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
