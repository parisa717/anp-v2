import { createAsyncThunk } from '@reduxjs/toolkit'

import { setAccessToken, setIsLoggedIn } from '@/entities/session'
import { isFetchBaseQueryError } from '@/shared/api'

type ThunkParams = {
  username: string
  password: string
}

const CORRECT_USERNAME = 'admin'
const CORRECT_PASSWORD = 'admin'
const EXAMPLE_ACCESS_TOKEN = 'some-example-access-token'

export const loginThunk = createAsyncThunk<void, ThunkParams, { state: RootState }>(
  'auth/login',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      // TODO here we will call the login endpoint (it could be the call of some endpoint from @/entities/session)
      if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAccessToken(EXAMPLE_ACCESS_TOKEN))
      } else {
        throw new Error('Incorrect username / password 123')
      }
    } catch (error) {
      console.error(error)

      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          return rejectWithValue(error.data)
        }
      }

      return rejectWithValue((error as Error).message)
    }
  },
)
