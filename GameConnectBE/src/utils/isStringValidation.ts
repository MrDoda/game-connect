export const isStringValidation = (value: any) => {
  if (typeof value !== 'string')
    throw new Error('Validation failed given property must be a string!')
}
