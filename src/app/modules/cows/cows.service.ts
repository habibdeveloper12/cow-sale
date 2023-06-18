import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeWrapper } from './cows.constant';
import { ICows, ISearchTermField } from './cows.interface';
import { Cows } from './cows.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (payload: ICows): Promise<ICows> => {
  //Summer 02 !== 03
  if (academicSemesterTitleCodeWrapper[payload.title] != payload.code) {
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      'session all will be need same as per code showing'
    );
  }
  const result = await Cows.create(payload);
  return result;
};

const getAllSemester = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<ICows[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    createPaginationHelpers(pagination);
  const { searchTerm, ...fieldData }: ISearchTermField = searchTermField;

  const searchItemField = ['title', 'code', 'year'];
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
  const result = await Cows.find(whereCondition)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);
  const total = await Cows.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findById(id);
  return result;
};
const updateCows = async (
  id: string,
  payload: Partial<ICows>
): Promise<ICows | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeWrapper[payload.title] != payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      'there need to give same right way'
    );
  }
  const result = await Cows.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCows = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findOneAndDelete({ _id: id });
  return result;
};

export const CowsService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateCows,
  deleteCows,
};
