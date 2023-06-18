import mongoose from 'mongoose'
import { IGenericMessage } from '../../interfaces/error'
import { IGenericErrorResponseMessage } from '../../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponseMessage => {
  const errors: IGenericMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Velidation Error',
    errorMessages: errors,
  }
}
export default handleValidationError
