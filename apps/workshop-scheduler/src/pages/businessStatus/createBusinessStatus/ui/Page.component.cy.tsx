import {
  CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'

import { CreateBusinessStatusPage } from './Page'

describe('CreateBusinessStatusPage', () => {
  describe('isAdditionalBusinessStatus is false', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add appointment status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.name').should('be.visible')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')

      cy.contains('Add status').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateBusinessStatuses')) {
          aliasMutation(req, 'CreateBusinessStatuses')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              name: 'Test business status',
              isDefault: true,
            },
            {
              name: 'Test business status 2',
              isDefault: false,
            },
          ])

          successResponse(req, CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateBusinessStatusesMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('removes entry when remove button is clicked', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.get('.pi-trash').first().click()

      cy.get('#businessStatuses\\.1\\.name').should('not.exist')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateBusinessStatuses')) {
          aliasMutation(req, 'CreateBusinessStatuses')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              name: 'Test business status 2',
              isDefault: false,
            },
          ])

          successResponse(req, CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateBusinessStatusesMutation')
    })

    it('updates isDefault to false on all other entries when the isDefault is checked for one of the entries', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add status').click()

      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').should('not.be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('not.be.checked')
      cy.get('input[name="businessStatuses.1.isDefault"]').should('be.checked')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add appointment status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.name').should('be.visible')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')
      cy.contains('label', 'Highlighted in slots').should('be.visible')
      cy.get('input[name="businessStatuses.0.isHighlighted"]').parent().should('be.visible')

      cy.contains('Add status').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()
      cy.get('input[name="businessStatuses.0.isHighlighted"]').parent().click()

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateAdditionalBusinessStatuses')) {
          aliasMutation(req, 'CreateAdditionalBusinessStatuses')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              name: 'Test business status',
              isDefault: true,
              isHighlighted: true,
            },
            {
              name: 'Test business status 2',
              isDefault: false,
              isHighlighted: false,
            },
          ])

          successResponse(req, CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateAdditionalBusinessStatusesMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('removes entry when remove button is clicked', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.get('.pi-trash').first().click()

      cy.get('#businessStatuses\\.1\\.name').should('not.exist')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateAdditionalBusinessStatuses')) {
          aliasMutation(req, 'CreateAdditionalBusinessStatuses')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              name: 'Test business status 2',
              isDefault: false,
              isHighlighted: false,
            },
          ])

          successResponse(req, CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateAdditionalBusinessStatusesMutation')
    })

    it('updates isDefault to false on all other entries when the isDefault is checked for one of the entries', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add status').click()

      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').should('not.be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('not.be.checked')
      cy.get('input[name="businessStatuses.1.isDefault"]').should('be.checked')
    })
  })
})
