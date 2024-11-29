import { type ApiWithTransformResponse } from '@/shared/api'

import { transformAppointments } from '../lib/transformAppointments'
import { type Appointment } from '../model/types'
import { api, GetAppointmentsQuery } from './GetAppointments.generated'

type AppointmentApi = ApiWithTransformResponse<typeof api, ['GetAppointments'], { GetAppointments: Appointment[] }>
type TagTypes = AppointmentApi['TagTypes']
type ApiEndpointDefinitions = AppointmentApi['ApiEndpointDefinitions']

export const appointmentApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetAppointments: {
      transformResponse: (response: GetAppointmentsQuery) => transformAppointments(response.appointments),
    },
  },
})

export const { useGetAppointmentsQuery } = appointmentApi
