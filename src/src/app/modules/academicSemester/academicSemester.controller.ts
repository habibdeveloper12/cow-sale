import { Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  paginationFieldData,
  searchableField,
} from '../../../constants/paginationField';
import { IAcademicSemester } from './academicSemester.interface';

const useCreateAcademicSemester: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Semester had been created',
      success: true,
      data: result,
    });
  }
);

const getAllAcademicSemester: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    // const pagination: IPagination = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   shortOrder: req.query.shortOrder,
    //   shortBy: req.query.shortBy,
    // };
    const paginationField = pick(req.query, paginationFieldData);
    const searchTermField = pick(req.query, searchableField);
    const result = await AcademicSemesterService.getAllSemester(
      paginationField,
      searchTermField
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Academic Semester ',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleAcademicSemester: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Single Academic Semester  ',
      success: true,
      data: result,
    });
  }
);
const updateAcademicSemester: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      payload
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Semester Successfully ',
      success: true,
      data: result,
    });
  }
);
const deleteAcademicSemester: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Semester Successfully ',
      success: true,
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  useCreateAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
