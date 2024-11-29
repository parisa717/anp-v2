import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SessionSlice = {
  isLoggedIn: boolean
  accessToken?: string
}

const initialState: SessionSlice = {
  isLoggedIn: false,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    clearSessionData: (state) => {
      state.accessToken = undefined
      state.isLoggedIn = false
    },
  },
})

export const selectIsLoggedIn = (state: RootState) => state.session.isLoggedIn

export const { setIsLoggedIn, setAccessToken, clearSessionData } = sessionSlice.actions
