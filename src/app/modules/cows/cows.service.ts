import { ICows, ISearchTermField } from './cows.interface';
import { Cows } from './cows.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createCows = async (payload: ICows): Promise<ICows> => {
  //Summer 02 !== 03
  // if (academicCowsTitleCodeWrapper[payload.title] != payload.code) {
  //   throw new ApiError(
  //     httpStatus.BAD_GATEWAY,
  //     'session all will be need same as per code showing'
  //   );
  // }
  const result = await Cows.create(payload);
  return result;
};

const getAllCows = async (
  pagination: IPagination,
  searchTermField: ISearchTermField
): Promise<IGenericResponseMetaData<ICows[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    createPaginationHelpers(pagination);
  const { searchTerm, minPrice, maxPrice, ...fieldData }: ISearchTermField =
    searchTermField;

  const searchItemField = ['minPrice', 'maxPrice', 'location'];
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchItemField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (minPrice) {
    andCondition.push({ minPrice: { $gte: minPrice } });
  }

  if (maxPrice) {
    andCondition.push({ maxPrice: { $lte: maxPrice } });
  }

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
    .limit(limit)
    .populate('seller');
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

const getSingleCows = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findById(id).populate('seller');
  return result;
};
const updateCows = async (
  id: string,
  payload: Partial<ICows>
): Promise<ICows | null> => {
  // if (
  //   payload.title &&
  //   payload.code &&
  //   academicCowsTitleCodeWrapper[payload.title] != payload.code
  // ) {
  //   throw new ApiError(
  //     httpStatus.BAD_GATEWAY,
  //     'there need to give same right way'
  //   );
  // }
  console.log(id, payload);
  const result = await Cows.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCows = async (id: string): Promise<ICows | null> => {
  const result = await Cows.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  ).populate('seller');
  return result;
};

export const CowsService = {
  createCows,
  getAllCows,
  getSingleCows,
  updateCows,
  deleteCows,
};
