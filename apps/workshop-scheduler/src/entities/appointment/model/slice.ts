import { createSlice } from '@reduxjs/toolkit'

import { appointmentApi } from '../api/appointmentApi'
import { Appointment } from './types'

type AppointmentSlice = {
  appointments: Appointment[]
}

const initialState: AppointmentSlice = {
  appointments: [],
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(appointmentApi.endpoints.GetAppointments.matchFulfilled, (state, { payload }) => {
      state.appointments = payload
    })
  },
})

export const selectAppointments = (state: RootState) => state.appointment.appointments
