import { createSlice } from '@reduxjs/toolkit'

import { WorkEntity } from './types'

type WorkSlice = {
  works: WorkEntity[]
}

const initialState: WorkSlice = {
  works: [],
}

export const workSlice = createSlice({
  name: 'Work',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
