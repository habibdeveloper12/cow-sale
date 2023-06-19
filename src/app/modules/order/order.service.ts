import { IOrders } from './order.interface';
import { Orders } from './order.modal';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponseMetaData } from '../../../interfaces/common';
import createPaginationHelpers from '../../../helpers/paginationHelpers';
import mongoose, { SortOrder } from 'mongoose';
import { ICows, ISearchTermField } from '../cows/cows.interface';
import { User } from '../users/user.modal';
import { Cows } from '../cows/cows.modal';
type IOrderRequest = {
  buyerId: string;
  cowId: string;
  cost: number;
};

const createOrders = async ({
  cowId,
  buyerId,
  cost,
}: IOrderRequest): Promise<IOrders[]> => {
  //Summer 02 !== 03
  const session = await mongoose.startSession();
  session.startTransaction();

  // Check if the buyer has enough money
  const buyer = await User.findById(buyerId).session(session);
  if (!buyer || buyer.budget < cost) {
    throw new Error('Insufficient funds');
  }

  // Update the cow's label to 'sold out'
  await Cows.findByIdAndUpdate(cowId, { label: 'sold out' }).session(session);

  // Deduct the cost from the buyer's budget
  await User.findByIdAndUpdate(buyerId, { $inc: { budget: -cost } }).session(
    session
  );

  // Get the seller's ID associated with the cow
  const cow: ICows | null = await Cows.findById(cowId).session(session);
  if (!cow) {
    throw new Error('Cow not found');
  }

  // Add the cost to the seller's income
  await User.findByIdAndUpdate(cow, { $inc: { income: cost } }).session(
    session
  );

  // Create an entry in the orders collection
  const order = new Orders({
    buyer: buyerId,
    cow: cowId,
    cost,
  });
  await order.save({ session });

  await session.commitTransaction();
  session.endSession();

  // Return the ordered array of objects
  const orders = await Orders.find().exec();

  return orders;
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

export const OrdersService = {
  createOrders,
  getAllFeculty,
};
