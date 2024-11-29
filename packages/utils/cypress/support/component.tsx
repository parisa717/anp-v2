// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-real-events'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount, MountOptions } from 'cypress/react18'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      mountWithProviders(
        component: ReactNode,
        options?: MountOptions & {
          initialRouteEntries?: string[]
          route?: string
        },
      ): typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountWithProviders', (component, options = {}) => {
  const { initialRouteEntries = ['/'], route = '/', ...mountOptions } = options

  const wrapped = (
    <MemoryRouter initialEntries={initialRouteEntries}>
      <Routes>
        <Route path={route} element={component} />
      </Routes>
    </MemoryRouter>
  )

  mount(wrapped, mountOptions)
})

// Example use:
// cy.mount(<MyComponent />)
