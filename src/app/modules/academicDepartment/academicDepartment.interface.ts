import { Model, Types } from 'mongoose';
import { IAcademicFeculty } from '../academicFeculty/academicFeculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFeculty: Types.ObjectId | IAcademicFeculty;
};
export type AcademicDepartmentModal = Model<IAcademicDepartment>;
