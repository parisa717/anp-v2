export type MockedGqlCurrentUser = {
  firstName: string
  lastName: string
  username: string
  email: string
  userRole: string
}

export const currentUser: MockedGqlCurrentUser = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'john-doe',
  email: 'john.doe@avag.com',
  userRole: 'AVAG_USER',
}
