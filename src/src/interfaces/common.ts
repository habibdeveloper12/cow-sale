import { IGenericMessage } from './error';

export type IGenericErrorResponseMessage = {
  statusCode: number;
  message: string;
  errorMessages: IGenericMessage[];
};
export type IGenericResponseMetaData<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
