import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModal,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFeculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFeculty',
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

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModal
>('AcademicDepartment', academicDepartmentSchema);
//handling same year and same semester issue

//Data-same year and semester for that we can use prehook
