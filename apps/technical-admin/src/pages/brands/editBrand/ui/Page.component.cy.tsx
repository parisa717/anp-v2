import { GET_BRAND_OPERATION_DEFAULT_RESPONSE, UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { pageUrls } from '@/shared/lib'

import { EditBrandPage } from './Page'

describe('EditBrandPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'UpdateBrand')
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetBrand')
    })
  })

  it('submits the form', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateBrand')) {
        aliasMutation(req, 'UpdateBrand')
        successResponse(req, {
          updateBrands: UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }

      if (hasOperationName(req, 'GetBrand')) {
        aliasQuery(req, 'GetBrand')
        successResponse(req, {
          getBrand: GET_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.mountWithProviders(<EditBrandPage />, {
      initialRouteEntries: ['/edit-brand/mocked_brand_1'],
      route: '/edit-brand/:id',
    })

    cy.wait('@gqlGetBrandQuery')

    // type in "Kia updated name" in the brand name text input
    cy.get('input[name="name"]').type('Kia updated name')

    // select "Active" in the brand status dropdown
    cy.get('[data-pc-name="dropdown"]').click()
    cy.get('[data-pc-section="item"]:contains("Active")').click()

    // click "Save" & "Confirm" buttons
    cy.get('button[aria-label="save"]').click()
    cy.get('button[aria-label="confirm"]').click()

    cy.wait('@gqlUpdateBrandMutation')

    cy.url().should('include', pageUrls.brands.root())
  })

  it('cancels the form', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrand')) {
        aliasQuery(req, 'GetBrand')
        successResponse(req, {
          getBrand: GET_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.mountWithProviders(<EditBrandPage />, {
      initialRouteEntries: ['/edit-brand/mocked_brand_1'],
      route: '/edit-brand/:id',
    })

    cy.wait('@gqlGetBrandQuery')

    cy.get('[data-pc-section="label"]:contains("cancel")').click()
    cy.url().should('include', pageUrls.brands.root())
  })

  it('Displays error message when form is submitted with invalid data', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrand')) {
        aliasQuery(req, 'GetBrand')
        successResponse(req, {
          getBrand: GET_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.mountWithProviders(<EditBrandPage />, {
      initialRouteEntries: ['/edit-brand/mocked_brand_1'],
      route: '/edit-brand/:id',
    })

    cy.wait('@gqlGetBrandQuery')

    cy.get('input[name="name"]').clear()

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.contains('This field is required').should('be.visible')
  })
})
