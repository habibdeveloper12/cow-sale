import mongoose, { Schema, model } from 'mongoose';
import { OrdersModal, IOrders } from './order.interface';

const ordersSchema = new Schema<IOrders>(
  {
    cow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

export const Orders = model<IOrders, OrdersModal>('Orders', ordersSchema);
//handling same year and same semester issue

//Data-same year and semester for that we can use prehook
