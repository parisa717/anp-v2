import { RouteObject } from 'react-router-dom'

import { authRequiredLoader, ROUTE_PATHS } from '@/shared/lib'

export const appointmentsRoutes: RouteObject = {
  path: ROUTE_PATHS.Appointments.Root,
  lazy: async () => {
    const { AppointmentsListPage } = await import('./appointmentsList/ui/Page')
    return { Component: AppointmentsListPage }
  },
  loader: authRequiredLoader,
  children: [
    {
      path: ROUTE_PATHS.Appointments.Book.Root,

      lazy: async () => {
        const { BookAppointmentPage } = await import('./bookAppointment/ui/Page')
        return { Component: BookAppointmentPage }
      },
      children: [
        {
          path: ROUTE_PATHS.Appointments.Book.ByStep,
          Component: () => null,
        },
      ],
    },
  ],
}
