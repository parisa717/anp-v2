import { RouteObject } from 'react-router-dom'

import { authRequiredLoader } from '@/shared/lib'

export const getRootRoute = (): RouteObject => {
  return {
    path: '/',
    lazy: async () => {
      const { AppointmentsListPage } = await import('@/pages/appointments/appointmentsList/ui/Page')
      return { Component: AppointmentsListPage }
    },
    loader: authRequiredLoader,
  }
}
