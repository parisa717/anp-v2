import { QueryCurrentUser } from '../api/types'
import { type UserEntity } from '../model/types'

export const transformUser = (dto: QueryCurrentUser) => {
  if (dto) {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.username,
      email: dto.email,
      role: dto.userRole,
    }
  }

  return {} as UserEntity
}
