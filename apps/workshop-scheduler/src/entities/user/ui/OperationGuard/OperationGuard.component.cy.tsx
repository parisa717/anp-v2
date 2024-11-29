import { DEFAULT_USER_MOCK } from '@cypress-fixtures'

import { getStore } from '@/app/store'
import { OperationGuard, setCurrentUser, setCurrentUserRole, USER_OPERATIONS, UserRole } from '@/entities/user'

describe('OperationGuard', () => {
  it('renders children when user can perform operation', () => {
    const store = getStore()

    store.dispatch(setCurrentUser(DEFAULT_USER_MOCK))

    cy.mountWithProviders(
      <OperationGuard operation={USER_OPERATIONS.VIEW_DASHBOARD}>
        <div data-cy="protected-content">Protected Content</div>
      </OperationGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('exist').and('have.text', 'Protected Content')
  })

  it('does not render children when user cannot perform operation', () => {
    const store = getStore()

    store.dispatch(setCurrentUser(DEFAULT_USER_MOCK))
    store.dispatch(setCurrentUserRole(UserRole.RegularUser))

    cy.mountWithProviders(
      <OperationGuard operation={USER_OPERATIONS.CREATE_APPOINTMENT}>
        <div data-cy="protected-content">Protected Content</div>
      </OperationGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('not.exist')
  })

  it('does not render children when there is no current user', () => {
    const store = getStore()

    cy.mountWithProviders(
      <OperationGuard operation={USER_OPERATIONS.CREATE_APPOINTMENT}>
        <div data-cy="protected-content">Protected Content</div>
      </OperationGuard>,
      { reduxStore: store },
    )

    cy.get('[data-cy="protected-content"]').should('not.exist')
  })
})
