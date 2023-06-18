import { ZodError, ZodIssue } from 'zod';
import { IGenericMessage } from '../interfaces/error';

const handleZodError = (error: ZodError) => {
  const errors: IGenericMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Velidation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
