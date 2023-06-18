import { Request, RequestHandler, Response } from 'express';
import { AcademicFecultyService } from './academicFeculty.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  paginationFieldData,
  searchableField,
} from '../../../constants/paginationField';
import { IAcademicFeculty } from './academicFeculty.interface';

const useCreateAcademicFeculty: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const { ...academicFecultyData } = req.body;
    const result = await AcademicFecultyService.createFeculty(
      academicFecultyData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Feculty had been created',
      success: true,
      data: result,
    });
  }
);

const getAllAcademicFeculty: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    // const pagination: IPagination = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   shortOrder: req.query.shortOrder,
    //   shortBy: req.query.shortBy,
    // };
    const paginationField = pick(req.query, paginationFieldData);
    const searchTermField = pick(req.query, searchableField);
    const result = await AcademicFecultyService.getAllFeculty(
      paginationField,
      searchTermField
    );

    sendResponse<IAcademicFeculty[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Academic Feculty ',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleAcademicFeculty: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFecultyService.getSingleFeculty(id);

    sendResponse<IAcademicFeculty>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Single Academic Feculty  ',
      success: true,
      data: result,
    });
  }
);
const updateAcademicFeculty: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await AcademicFecultyService.updateAcademicFeculty(
      id,
      payload
    );

    sendResponse<IAcademicFeculty>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Feculty Successfully ',
      success: true,
      data: result,
    });
  }
);
const deleteAcademicFeculty: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicFecultyService.deleteAcademicFeculty(id);

    sendResponse<IAcademicFeculty>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Feculty Successfully ',
      success: true,
      data: result,
    });
  }
);

export const AcademicFecultyController = {
  useCreateAcademicFeculty,
  getAllAcademicFeculty,
  getSingleAcademicFeculty,
  updateAcademicFeculty,
  deleteAcademicFeculty,
};
