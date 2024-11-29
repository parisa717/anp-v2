import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth'

export function getStore() {
  return configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
  })
}

export const store = getStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
