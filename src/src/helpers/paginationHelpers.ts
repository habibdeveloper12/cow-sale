import { SortOrder } from 'mongoose';

export type IPaginationHelper = {
  page?: number | 1;
  limit?: number | 10;
  sortBy?: string | 'createdAt';
  shortOrder?: SortOrder | 'desc';
};
type IPaginationReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const createPaginationHelpers = (
  pagination: IPaginationHelper
): IPaginationReturn => {
  const page = Number(pagination.page) || 1;
  const limit = Number(pagination.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = pagination.sortBy || 'createdAt';
  const sortOrder = pagination.shortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export default createPaginationHelpers;
