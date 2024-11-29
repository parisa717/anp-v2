import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'

// TODO here we will have a logic tied to our backend errors format
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}
