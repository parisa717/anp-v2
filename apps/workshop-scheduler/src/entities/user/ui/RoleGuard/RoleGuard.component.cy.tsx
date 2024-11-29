import { DEFAULT_USER_MOCK } from '@cypress-fixtures'

import { getStore } from '@/app/store'
import { RoleGuard, setCurrentUser, setCurrentUserRole, UserRole } from '@/entities/user'

describe('RoleGuard', () => {
  it('renders children when user has required role', () => {
    const store = getStore()

    store.dispatch(setCurrentUser(DEFAULT_USER_MOCK))

    cy.mountWithProviders(
      <RoleGuard requiredUserRole={UserRole.AdminUser}>
        <div data-cy="protected-content">Protected Content</div>
      </RoleGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('exist').and('have.text', 'Protected Content')
  })

  it('does not render children when user does not have required role', () => {
    const store = getStore()

    store.dispatch(setCurrentUser(DEFAULT_USER_MOCK))
    store.dispatch(setCurrentUserRole(UserRole.RegularUser))

    cy.mountWithProviders(
      <RoleGuard requiredUserRole={UserRole.AdminUser}>
        <div data-cy="protected-content">Protected Content</div>
      </RoleGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('not.exist')
  })

  it('does not render children when there is no current user', () => {
    const store = getStore()

    cy.mountWithProviders(
      <RoleGuard requiredUserRole={UserRole.AdminUser}>
        <div data-cy="protected-content">Protected Content</div>
      </RoleGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('not.exist')
  })
})
