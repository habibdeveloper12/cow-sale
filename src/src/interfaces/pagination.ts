import { SortOrder } from 'mongoose';

export type IPagination = {
  page?: number | 1;
  limit?: number | 10;
  sortBy?: string | 'createdAt';
  shortOrder?: SortOrder | 'desc';
};
