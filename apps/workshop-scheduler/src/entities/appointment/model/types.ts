export interface Appointment {
  id: string
  type: 'pickup' | 'reception'
  customer: {
    id: string
    name: string
    username: string
    email: string
  }
  serviceAdvisor: {
    id: string
    name: string
    username: string
    email: string
  }
}
