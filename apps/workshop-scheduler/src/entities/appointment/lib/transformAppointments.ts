import { AppointmentDTO, QueryAppointments } from '../api/types'
import { type Appointment } from '../model/types'

/**
 * This is an example transformResponse function
 */
const mapAppointment = (dto: AppointmentDTO | null): Appointment | null => {
  if (dto === null) {
    return null
  }

  return {
    ...dto,
    id: 'appointment_' + dto.id,
    type: dto.type === 'RECEPTION' ? 'reception' : 'pickup',
  }
}

const filterAppointments = (appointment: Appointment | null): appointment is Appointment => appointment !== null

export const transformAppointments = (appointments: QueryAppointments) => {
  return appointments?.map(mapAppointment).filter(filterAppointments) ?? []
}
