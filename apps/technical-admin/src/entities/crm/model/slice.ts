import { createSlice } from '@reduxjs/toolkit'

import { crmApi } from '../api/crmApi'
import { CrmEntity } from './types'

type CrmSlice = {
  crms: CrmEntity[]
}

const initialState: CrmSlice = {
  crms: [],
}

export const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(crmApi.endpoints.GetCrms.matchFulfilled, (state: CrmSlice, { payload }) => {
      state.crms = payload
    })
  },
})

export const selectCrm = (state: RootState) => state.crm.crms
