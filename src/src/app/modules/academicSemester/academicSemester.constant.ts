import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTittle,
} from './academicSemester.interface';

export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];
export const academicSemesterTitle: IAcademicSemesterTittle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterTitleCodeWrapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
