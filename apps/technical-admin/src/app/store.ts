import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { areaSlice } from '@/entities/area'
import { brandSlice } from '@/entities/brand'
import { countrySlice } from '@/entities/country'
import { crmSlice } from '@/entities/crm'
import { dmsSlice } from '@/entities/dms'
import { sessionSlice } from '@/entities/session'
import { userSlice } from '@/entities/user'
import { baseApi } from '@/shared/api'

export function getStore() {
  const store = configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [areaSlice.name]: areaSlice.reducer,
      [brandSlice.name]: brandSlice.reducer,
      [countrySlice.name]: countrySlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [crmSlice.name]: crmSlice.reducer,
      [dmsSlice.name]: dmsSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const store = getStore()

/** docs: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types **/
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
