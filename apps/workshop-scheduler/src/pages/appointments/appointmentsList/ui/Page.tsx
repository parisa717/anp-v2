import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import { Outlet, useNavigate } from 'react-router-dom'

import { useGetAppointmentsQuery } from '@/entities/appointment'
import { pageUrls } from '@/shared/lib'

export const AppointmentsListPage = () => {
  const { data: appointments, isLoading } = useGetAppointmentsQuery()
  const navigate = useNavigate()

  const handleBookAppointmentClick = () => navigate(pageUrls.appointments.book.root())

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div>
      <h2>Appointments List</h2>

      <Button label="Book an appointment" onClick={handleBookAppointmentClick} />

      <div className="grid grid-cols-4 gap-4">
        {appointments?.map((appointment) => (
          <div key={appointment.id} className="py-4">
            <Panel header="10:30">
              <div className="pb-2">
                <h3>Customer:</h3>
                <p className="m-0">{appointment.customer.name}</p>
                <p className="m-0">{appointment.customer.username}</p>
                <p className="m-0">{appointment.customer.email}</p>
              </div>
              <div className="py-2">
                <h3>Service advisor:</h3>
                <p className="m-0">{appointment.serviceAdvisor.name}</p>
              </div>
            </Panel>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
