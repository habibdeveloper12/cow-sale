import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeWrapper } from './academicSemester.constant';
import {
  IAcademicSemester,
  ISearchTermField,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //Summer 02 !== 03
  if (academicSemesterTitleCodeWrapper[payload.title] != payload.code) {
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      'session all will be need same as per code showing'
    );
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<IAcademicSemester[]>> => {
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
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
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
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
