import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Outlet, useNavigate } from 'react-router-dom'

import { pageUrls } from '@/shared/lib'

export const BookAppointmentPage = () => {
  const navigate = useNavigate()

  const handleOnHide = () => {
    navigate(pageUrls.appointments.root())
  }

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Book an appointment</span>
    </div>
  )

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={handleOnHide} className="p-button-text" />
      <Button label="Next" icon="pi pi-check" onClick={() => {}} autoFocus />
    </div>
  )

  return (
    <>
      <Dialog
        visible
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: '50rem' }}
        onHide={handleOnHide}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Dialog>
      <Outlet />
    </>
  )
}
