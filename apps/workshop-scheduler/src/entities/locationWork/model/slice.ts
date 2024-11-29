import { createSlice } from '@reduxjs/toolkit'

import { LocationWorksEntity } from './types'

type LocationWorksSlice = {
  locationWorks: LocationWorksEntity[]
}

const initialState: LocationWorksSlice = {
  locationWorks: [],
}

export const locationWorksSlice = createSlice({
  name: 'LocationWorks',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
