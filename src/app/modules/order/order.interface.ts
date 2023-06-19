import { Model, Types } from 'mongoose';

export type IOrders = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
};
export type OrdersModal = Model<IOrders>;
