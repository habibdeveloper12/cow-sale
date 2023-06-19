import { Request, RequestHandler, Response } from 'express';
import { OrdersService } from './orders.service';
import cerateAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendRespond';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import {
  paginationFieldData,
  searchableField,
} from '../../../constants/paginationField';
import { IOrders } from './orders.interface';

const useCreateOrders: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const { ...academicFecultyData } = req.body;
    const result = await OrdersService.createFeculty(academicFecultyData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Feculty had been created',
      success: true,
      data: result,
    });
  }
);

const getAllOrders: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    // const pagination: IPagination = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   shortOrder: req.query.shortOrder,
    //   shortBy: req.query.shortBy,
    // };
    const paginationField = pick(req.query, paginationFieldData);
    const searchTermField = pick(req.query, searchableField);
    const result = await OrdersService.getAllFeculty(
      paginationField,
      searchTermField
    );

    sendResponse<IOrders[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Academic Feculty ',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleOrders: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OrdersService.getSingleFeculty(id);

    sendResponse<IOrders>(res, {
      statusCode: httpStatus.OK,
      message: 'Here is Single Academic Feculty  ',
      success: true,
      data: result,
    });
  }
);
const updateOrders: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await OrdersService.updateOrders(id, payload);

    sendResponse<IOrders>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Feculty Successfully ',
      success: true,
      data: result,
    });
  }
);
const deleteOrders: RequestHandler = cerateAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await OrdersService.deleteOrders(id);

    sendResponse<IOrders>(res, {
      statusCode: httpStatus.OK,
      message: 'Update Feculty Successfully ',
      success: true,
      data: result,
    });
  }
);

export const OrdersController = {
  useCreateOrders,
  getAllOrders,
  getSingleOrders,
  updateOrders,
  deleteOrders,
};
