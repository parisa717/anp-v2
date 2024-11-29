import { User as GeneratedUserType } from '@/shared/api/types.generated'

import { GetCurrentUserQuery } from './GetCurrentUser.generated'

export type UserDTO = GeneratedUserType
export type QueryCurrentUser = GetCurrentUserQuery['currentUser']
