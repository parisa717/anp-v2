import { Appointment as GeneratedAppointmentType } from '@/shared/api/types.generated'

import { GetAppointmentsQuery } from './GetAppointments.generated'

/**
 * This is an example interface
 */

export type AppointmentDTO = GeneratedAppointmentType
export type QueryAppointments = GetAppointmentsQuery['appointments']
