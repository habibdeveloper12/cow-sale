import { Model, Types } from 'mongoose';
import { IOrders } from '../orders/orders.interface';

export type IAcademicDepartment = {
  title: string;
  orders: Types.ObjectId | IOrders;
};
export type AcademicDepartmentModal = Model<IAcademicDepartment>;
