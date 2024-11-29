import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { userApi } from '../api/userApi'
import { User, UserRole } from './types'

type UserSlice = {
  currentUser: User | null
}

const initialState: UserSlice = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    setCurrentUserRole: (state, action: PayloadAction<UserRole>) => {
      if (state.currentUser) {
        state.currentUser.role = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.GetCurrentUser.matchFulfilled, (state, { payload }) => {
      state.currentUser = payload
    })
  },
})

export const selectCurrentUser = (state: RootState) => state.user.currentUser
export const selectCurrentUserRole = (state: RootState) => state.user.currentUser?.role

export const { setCurrentUserRole, setCurrentUser } = userSlice.actions
