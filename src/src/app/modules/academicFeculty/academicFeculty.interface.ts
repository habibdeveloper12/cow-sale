import { Model } from 'mongoose';

export type IOrders = {
  title: string;
};
export type OrdersModal = Model<IOrders>;
