export type MockedGqlCustomer = {
  id: string
  name: string
  username: string
  email: string
}

export type MockedGqlServiceAdvisor = {
  id: string
  name: string
  username: string
  email: string
}

export type MockedGqlAppointment = {
  id: string
  type: string
  customer: MockedGqlCustomer
  serviceAdvisor: MockedGqlServiceAdvisor
}

export const appointments: MockedGqlAppointment[] = [
  {
    id: '1',
    type: 'RECEPTION',
    customer: {
      id: 'user_1',
      name: 'Mr Robert Meissner',
      username: 'robert-meissner',
      email: 'robertmeissner@gmail.com',
    },
    serviceAdvisor: {
      id: 'advisor_1',
      name: 'Patrick',
      username: 'patrick-server-advisor',
      email: 'patrick@avag.com',
    },
  },
  {
    id: '2',
    type: 'RECEPTION',
    customer: {
      id: 'user_2',
      name: 'Mrs Daniela Muller',
      username: 'daniela-muller',
      email: 'danielamuller@gmail.com',
    },
    serviceAdvisor: {
      id: 'advisor_1',
      name: 'Patrick',
      username: 'patrick-server-advisor',
      email: 'patrick@avag.com',
    },
  },
  {
    id: '3',
    type: 'RECEPTION',
    customer: {
      id: 'user_3',
      name: 'Mr Astrubal Leuter',
      username: 'astrubal-leuter',
      email: 'astruballeuter@gmail.com',
    },
    serviceAdvisor: {
      id: 'advisor_2',
      name: 'Niels',
      username: 'niels-server-advisor',
      email: 'niels@avag.com',
    },
  },
  {
    id: 'appointment_4',
    type: 'RECEPTION',
    customer: {
      id: 'user_4',
      name: 'Mr Robert Doe',
      username: 'robert-doe',
      email: 'rober-doe@gmail.com',
    },
    serviceAdvisor: {
      id: 'advisor_3',
      name: 'Lucas',
      username: 'lucas-server-advisor',
      email: 'lucas@avag.com',
    },
  },
]
