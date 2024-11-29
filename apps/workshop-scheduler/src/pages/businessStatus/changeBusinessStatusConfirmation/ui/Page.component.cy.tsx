import {
  ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'
import { createSearchParams } from 'react-router-dom'

import { ChangeBusinessStatusSearchParams } from '@/entities/businessStatus'

import { ChangeBusinessStatusConfirmationPage } from './Page'

const BUSINESS_STATUS_ID = '1'

const getSearchParamsString = (params: ChangeBusinessStatusSearchParams) => createSearchParams(params).toString()

describe('ChangeBusinessStatusConfirmationPage', () => {
  describe('renders correctly', () => {
    it('renders the confirmation modal correctly', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.contains('Status Change').should('be.visible')

      cy.contains('Are you sure you want to change the status?').should('be.visible')

      cy.get('button[aria-label="confirm"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })
  })

  describe('isAdditionalBusinessStatus is false', () => {
    it('executes the activate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateBusinessStatus')) {
          aliasMutation(req, 'ActivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlActivateBusinessStatusMutation')
    })

    it('executes the deactivate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateBusinessStatus')) {
          aliasMutation(req, 'DeactivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlDeactivateBusinessStatusMutation')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    it('executes the activate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'ActivateAdditionalBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlActivateAdditionalBusinessStatusMutation')
    })

    it('executes the deactivate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'DeactivateAdditionalBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlDeactivateAdditionalBusinessStatusMutation')
    })
  })
})
