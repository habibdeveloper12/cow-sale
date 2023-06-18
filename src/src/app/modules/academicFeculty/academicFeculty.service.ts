import { IAcademicFeculty } from './academicFeculty.interface';
import { AcademicFeculty } from './academicFeculty.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { ISearchTermField } from '../academicSemester/academicSemester.interface';

const createFeculty = async (
  payload: IAcademicFeculty
): Promise<IAcademicFeculty> => {
  //Summer 02 !== 03
  console.log(payload);
  const result = await AcademicFeculty.create(payload);
  return result;
};

const getAllFeculty = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<IAcademicFeculty[]>> => {
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
  const result = await AcademicFeculty.find(whereCondition)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFeculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFeculty = async (
  id: string
): Promise<IAcademicFeculty | null> => {
  const result = await AcademicFeculty.findById(id);
  return result;
};
const updateAcademicFeculty = async (
  id: string,
  payload: Partial<IAcademicFeculty>
): Promise<IAcademicFeculty | null> => {
  const result = await AcademicFeculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicFeculty = async (
  id: string
): Promise<IAcademicFeculty | null> => {
  const result = await AcademicFeculty.findOneAndDelete({ _id: id });
  return result;
};

export const AcademicFecultyService = {
  createFeculty,
  getAllFeculty,
  getSingleFeculty,
  updateAcademicFeculty,
  deleteAcademicFeculty,
};
