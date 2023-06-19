import { Schema, model } from 'mongoose';
import { OrdersModal, IOrders } from './orders.interface';

const academicFecultySchema = new Schema<IOrders>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Orders = model<IOrders, OrdersModal>(
  'Orders',
  academicFecultySchema
);
//handling same year and same semester issue

//Data-same year and semester for that we can use prehook
