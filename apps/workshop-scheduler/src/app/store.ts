import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { additionalBusinessStatusSlice } from '@/entities/additionalBusinessStatus'
import { appointmentSlice } from '@/entities/appointment'
import { areaSlice } from '@/entities/area'
import { availabilityColorSlice } from '@/entities/availabilityColor'
import { brandSlice } from '@/entities/brand'
import { businessStatusSlice } from '@/entities/businessStatus'
import { locationSlice } from '@/entities/location'
import { locationOverbookingSlice } from '@/entities/locationOverbooking'
import { locationWorksSlice } from '@/entities/locationWork'
import { qualificationSlice } from '@/entities/qualification'
import { sessionSlice } from '@/entities/session'
import { userSlice } from '@/entities/user'
import { workSlice } from '@/entities/work'
import { baseApi } from '@/shared/api'
import { applicationMessageSlice } from '@/shared/model'

export function getStore() {
  const store = configureStore({
    reducer: {
      [sessionSlice.name]: sessionSlice.reducer,
      [appointmentSlice.name]: appointmentSlice.reducer,
      [areaSlice.name]: areaSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [businessStatusSlice.name]: businessStatusSlice.reducer,
      [additionalBusinessStatusSlice.name]: additionalBusinessStatusSlice.reducer,
      [locationSlice.name]: locationSlice.reducer,
      [availabilityColorSlice.name]: availabilityColorSlice.reducer,
      [brandSlice.name]: brandSlice.reducer,
      [applicationMessageSlice.name]: applicationMessageSlice.reducer,
      [locationOverbookingSlice.name]: locationOverbookingSlice.reducer,
      [locationWorksSlice.name]: locationWorksSlice.reducer,
      [workSlice.name]: workSlice.reducer,
      [qualificationSlice.name]: qualificationSlice.reducer,
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
