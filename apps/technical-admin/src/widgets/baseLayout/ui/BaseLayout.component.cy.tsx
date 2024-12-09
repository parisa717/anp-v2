import { GET_CURRENT_USER_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'
import { t } from 'i18next'

import { getStore } from '@/app/store'
import { setIsLoggedIn } from '@/entities/session'
import { UserRole } from '@/entities/user'
import { BaseLayout } from '@/widgets/baseLayout'
import { getMenuItems } from '@/widgets/baseLayout/lib/getMenuItems'

describe('BaseLayout', () => {
  beforeEach(() => {
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
  })

  it('renders the menu', () => {
    getMenuItems(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

 
})
