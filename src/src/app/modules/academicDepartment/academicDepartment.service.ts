import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { ISearchTermField } from '../academicSemester/academicSemester.interface';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  //Summer 02 !== 03
  console.log(payload);
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFeculty'
  );
  return result;
};

const getAllDepartment = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<IAcademicDepartment[]>> => {
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
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
    .populate('academicFeculty');
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFeculty'
  );
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFeculty');
  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndDelete({
    _id: id,
  }).populate('academicFeculty');
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
