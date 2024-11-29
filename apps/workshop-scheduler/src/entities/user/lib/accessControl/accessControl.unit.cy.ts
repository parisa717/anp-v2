import { DEFAULT_USER_MOCK } from '@cypress-fixtures'

import { UserRole } from '@/entities/user'
import { canPerformOperation, hasRequiredUserRole } from '@/entities/user/lib/accessControl'

describe('User Role and Operation Permissions', () => {
  describe('hasRequiredUserRole', () => {
    it('should return true when user has a higher role level', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.AdminUser,
      }

      const requiredRole = UserRole.RegularUser
      expect(hasRequiredUserRole(user, requiredRole)).to.be.true
    })

    it('should return true when user has the same role level', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.RegularUser,
      }

      const requiredRole = UserRole.RegularUser
      expect(hasRequiredUserRole(user, requiredRole)).to.be.true
    })

    it('should return false when user has a lower role level', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.ReadOnly,
      }

      const requiredRole = UserRole.RegularUser
      expect(hasRequiredUserRole(user, requiredRole)).to.be.false
    })
  })

  describe('canPerformOperation', () => {
    it('should return true when user has required role for operation', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.AdminUser,
      }

      const operation = { name: 'operation_name', requiredUserRole: UserRole.RegularUser }
      expect(canPerformOperation(user, operation)).to.be.true
    })

    it('should return false when user does not have required role for operation', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.ReadOnly,
      }

      const operation = { name: 'operation_name', requiredUserRole: UserRole.AdminUser }
      expect(canPerformOperation(user, operation)).to.be.false
    })

    it('should return true for highest role user', () => {
      const user = {
        ...DEFAULT_USER_MOCK,
        role: UserRole.AvagUser,
      }

      const operation = { name: 'operation_name', requiredUserRole: UserRole.AdminUser }
      expect(canPerformOperation(user, operation)).to.be.true
    })
  })
})
