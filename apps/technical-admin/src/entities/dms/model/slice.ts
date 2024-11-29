import { createSlice } from '@reduxjs/toolkit'

import { dmsApi } from '../api/dmsApi'
import { DmsEntity } from './types'

type DmsSlice = {
  dmss: DmsEntity[]
}

const initialState: DmsSlice = {
  dmss: [],
}

export const dmsSlice = createSlice({
  name: 'dms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(dmsApi.endpoints.GetDmss.matchFulfilled, (state: DmsSlice, { payload }) => {
      state.dmss = payload
    })
  },
})

export const selectDms = (state: RootState) => state.dms.dmss
