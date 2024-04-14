export interface ErrorType {
  message: string
}

export type Result<T> = [ErrorType, null] | [null, T]
export type ResultPromise<T> = Promise<Result<T>>
