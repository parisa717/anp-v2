import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from './types'

const initialState: AuthState = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn

export const { setIsLoggedIn } = authSlice.actions
