import { Schema, model } from 'mongoose';
import {
  AcademicFecultyModal,
  IAcademicFeculty,
} from './academicFeculty.interface';

const academicFecultySchema = new Schema<IAcademicFeculty>(
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

export const AcademicFeculty = model<IAcademicFeculty, AcademicFecultyModal>(
  'AcademicFeculty',
  academicFecultySchema
);
//handling same year and same semester issue

//Data-same year and semester for that we can use prehook
