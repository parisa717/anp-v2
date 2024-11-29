import { GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'
import { t } from 'i18next'

import { getStore } from '@/app/store'
import { setIsLoggedIn } from '@/entities/session'
import { UserRole } from '@/entities/user'
import { BaseLayout } from '@/widgets/baseLayout'
import { getAdminUserMenu } from '@/widgets/baseLayout/config/adminUserMenu'
import { getAvagUserMenu } from '@/widgets/baseLayout/config/avagUserMenu'
import { getReadOnlyUserMenu } from '@/widgets/baseLayout/config/readOnlyUserMenu'
import { getRegularPlusUserMenu } from '@/widgets/baseLayout/config/regularPlusUserMenu'
import { getRegularUserMenu } from '@/widgets/baseLayout/config/regularUserMenu'

describe('BaseLayout', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetCurrentUser')
    })
  })

  it('renders corresponding menu for a user with read-only role', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        successResponse(req, {
          currentUser: { ...GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE, userRole: UserRole.ReadOnly },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    getReadOnlyUserMenu(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('renders corresponding menu for a user with regular role', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        successResponse(req, {
          currentUser: { ...GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE, userRole: UserRole.RegularUser },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    getRegularUserMenu(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('renders corresponding menu for a user with regular plus role', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        successResponse(req, {
          currentUser: { ...GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE, userRole: UserRole.RegularPlusUser },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    getRegularPlusUserMenu(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('renders corresponding menu for a user with admin role', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        successResponse(req, {
          currentUser: { ...GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE, userRole: UserRole.AdminUser },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    getAdminUserMenu(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('renders corresponding menu for a user with avag user role', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        successResponse(req, {
          currentUser: { ...GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE, userRole: UserRole.AvagUser },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    getAvagUserMenu(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('does not render menu when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCurrentUser')) {
        aliasQuery(req, 'GetCurrentUser')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    const store = getStore()

    store.dispatch(setIsLoggedIn(true))

    cy.mountWithProviders(<BaseLayout />, { reduxStore: store })
    cy.wait('@gqlGetCurrentUserQuery')

    const firstMenuItem = getAdminUserMenu(t)[0].items?.[0]

    if (firstMenuItem?.label) {
      cy.contains(firstMenuItem.label).should('not.exist')
    } else {
      throw new Error('First menu item not found')
    }
  })
})
