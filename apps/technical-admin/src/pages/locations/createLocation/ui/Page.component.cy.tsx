import {
  CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_AREAS_OPERATION_DEFAULT_RESPONSE,
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { CreateLocationPage } from '@/pages/locations/createLocation/ui/Page'
import { pageUrls } from '@/shared/lib'

describe('CreateLocationPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')

        successResponse(req, { areas: GET_AREAS_OPERATION_DEFAULT_RESPONSE })
      }
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')

        successResponse(req, { getBrands: { data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE } })
      }
    })
  })

  it('renders the page', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.contains('Add Location').should('be.visible')
    cy.get('#areaId').should('be.visible')
    cy.get('#copyNameFromArea').parent().should('be.visible')
    cy.get('#copyNameFromArea').should('be.disabled')
    cy.contains('label', 'Copy name from Area').should('be.visible')
    cy.get('input[name="id"]').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="zipCode"]').should('be.visible')
    cy.get('input[name="city"]').should('be.visible')
    cy.get('input[name="address"]').should('be.visible')
    cy.get('#brandIds\\.0\\.id').should('be.visible')
    cy.contains('Add brand').should('be.visible')
    cy.get('#isActive').should('be.visible')

    cy.get('button[aria-label="save"]').should('be.visible')
    cy.get('button[aria-label="cancel"]').should('be.visible')
  })

  it('submits the form with valid data', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('[data-pc-name="dropdown"]').first().click()
    cy.get(`[data-pc-section="item"]:contains(${GET_AREAS_OPERATION_DEFAULT_RESPONSE?.[0]?.name})`).click()
    cy.get('input[name="id"]').type('LOC001')
    cy.get('input[name="name"]').type('Test Location')
    cy.get('input[name="zipCode"]').type('12345')
    cy.get('input[name="city"]').type('Test City')
    cy.get('input[name="address"]').type('123 Test St')
    cy.get('#brandIds\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('#isActive').click()
    cy.contains('inactive').click()

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateLocation')) {
        aliasMutation(req, 'CreateLocation')

        expect(req.body.variables.location).to.deep.equal({
          areaId: GET_AREAS_OPERATION_DEFAULT_RESPONSE?.[0]?.id,
          id: '001',
          name: 'Test Location',
          zipCode: '12345',
          city: 'Test City',
          address: '123 Test St',
          brandIds: ['brand_1'],
          isActive: false,
        })

        successResponse(req, {
          createLocation: CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.get('button[aria-label="save"]').click()

    cy.url().should('include', pageUrls.locations.root())
  })

  it('displays error messages for invalid form submission', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('button[aria-label="save"]').click()

    cy.get('.text-error').should('have.length', 7)
  })

  it('copies name from area when checkbox is checked', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('#copyNameFromArea').should('be.disabled')
    cy.get('[data-pc-name="dropdown"]').first().click()
    cy.get(`[data-pc-section="item"]:contains(${GET_AREAS_OPERATION_DEFAULT_RESPONSE?.[0]?.name})`).click()
    cy.get('#copyNameFromArea').should('be.enabled')
    cy.get('#copyNameFromArea').click()
    cy.get('input[name="name"]').should('have.value', GET_AREAS_OPERATION_DEFAULT_RESPONSE?.[0]?.name)
  })

  it('allows adding multiple brands', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('#brandIds\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.contains('Add brand').click()
    cy.get('#brandIds\\.1\\.id').click()
    cy.contains('Nissan').click()
  })

  it('cancels the form', () => {
    cy.mountWithProviders(<CreateLocationPage />)
    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('[data-pc-section="label"]:contains("cancel")').click()
    cy.url().should('include', pageUrls.locations.root())
  })
})
