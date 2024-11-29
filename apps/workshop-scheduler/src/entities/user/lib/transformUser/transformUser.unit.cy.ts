import { transformUser } from '@/entities/user/lib/transformUser'
import { User, UserRole } from '@/entities/user/model/types'

describe('transformUser() function', () => {
  it('should transform a valid QueryCurrentUser DTO to User', () => {
    const dto = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      userRole: UserRole.AdminUser,
    }

    const expectedUser: User = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      role: UserRole.AdminUser,
    }

    const result = transformUser(dto)
    expect(result).to.deep.equal(expectedUser)
  })

  it('should return an empty User object when dto is null', () => {
    const result = transformUser(null)
    expect(result).to.deep.equal({})
  })

  it('should return an empty User object when dto is undefined', () => {
    const result = transformUser(undefined)
    expect(result).to.deep.equal({})
  })
})
