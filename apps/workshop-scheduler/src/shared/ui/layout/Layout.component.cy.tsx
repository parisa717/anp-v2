import { Layout } from '@/shared/ui'

describe('Layout', () => {
  it('Renders the nav menu with the menu items', () => {
    const menuItems = [
      {
        label: 'dashboard',
        icon: 'pi pi-palette',
        url: 'dashboard',
      },
      {
        label: 'appointments',
        icon: 'pi pi-link',
        url: 'appointments',
      },
    ]

    cy.mountWithProviders(<Layout userFullName="John Doe" isLoggedIn menuItems={menuItems} />)

    cy.get('[data-cy="layout-menu"] [role="menuitem"]').should('have.length', 2)
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').eq(0).should('have.text', 'dashboard')
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').eq(1).should('have.text', 'appointments')
  })
})
