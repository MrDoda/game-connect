import { ErrorType } from '../types/common.types'
import { ValidationError } from 'sequelize'

export const getErrorMessageFromSequelize = (
  error: ValidationError,
  message = 'Unknown Error',
  prefix = ''
): ErrorType => {
  if (Array.isArray(error?.errors)) {
    message = error.errors.map((error: any) => error.message).join(', ')
  }

  return { message: `${prefix} ${message}` }
}
