import { Model } from 'mongoose';

export type IAcademicFeculty = {
  title: string;
};
export type AcademicFecultyModal = Model<IAcademicFeculty>;
