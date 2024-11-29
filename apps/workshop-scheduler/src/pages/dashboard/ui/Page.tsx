import { Message } from 'primereact/message'
import { useState } from 'react'

export const DashboardPage = () => {
  const [headline] = useState('workshop scheduler')

  return (
    <div>
      <h1 className="text-3xl text-blue-500 capitalize mb-4">{headline}</h1>
      <Message text={'PrimeReact is ready!'} />
      <h2>Dashboard</h2>
    </div>
  )
}
