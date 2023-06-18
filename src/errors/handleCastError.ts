import mongoose from 'mongoose';
import { IGenericMessage } from '../interfaces/error';

const handleCastError = (err: mongoose.CastError) => {
  const errors: IGenericMessage[] = [
    {
      path: err.path,
      message: 'invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'cast Error',
    errorMessages: errors,
  };
};
export default handleCastError;
