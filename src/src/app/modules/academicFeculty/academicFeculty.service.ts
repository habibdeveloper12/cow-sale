import { IOrders } from './orders.interface';
import { Orders } from './orders.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { ISearchTermField } from '../academicSemester/academicSemester.interface';

const createFeculty = async (payload: IOrders): Promise<IOrders> => {
  //Summer 02 !== 03
  console.log(payload);
  const result = await Orders.create(payload);
  return result;
};

const getAllFeculty = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<IOrders[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    createPaginationHelpers(pagination);
  const { searchTerm, ...fieldData }: ISearchTermField = searchTermField;

  const searchItemField = ['title'];
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchItemField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  if (Object.keys(fieldData).length) {
    andCondition.push({
      $and: Object.entries(fieldData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // $and:[
  //   {
  //     title:fieldData
  //   }
  // ]
  const sortObject: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortObject[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Orders.find(whereCondition)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);
  const total = await Orders.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFeculty = async (id: string): Promise<IOrders | null> => {
  const result = await Orders.findById(id);
  return result;
};
const updateOrders = async (
  id: string,
  payload: Partial<IOrders>
): Promise<IOrders | null> => {
  const result = await Orders.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOrders = async (id: string): Promise<IOrders | null> => {
  const result = await Orders.findOneAndDelete({ _id: id });
  return result;
};

export const OrdersService = {
  createFeculty,
  getAllFeculty,
  getSingleFeculty,
  updateOrders,
  deleteOrders,
};
