import { createAsyncThunk } from '@reduxjs/toolkit'

import { clearSessionData } from '@/entities/session'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData())
  },
)
