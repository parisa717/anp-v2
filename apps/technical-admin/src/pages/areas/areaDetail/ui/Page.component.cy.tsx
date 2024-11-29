import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { AreaDTO } from '@/entities/area/api/types'

import { AreaDetailPage } from './page'

const MOCK_AREA: AreaDTO = {
  id: '1',
  name: 'Test Area',
  code: 'TA123',
  address: {
    id: '1',
    country: { id: '1', name: 'Testland' },
    postCode: '12345',
    city: 'Test City',
    address: '123 Test Street',
  },
  dms: { id: '1', name: 'Test DMS' },
  crm: { id: '1', name: 'Test CRM' },
  isActive: true,
}

describe('AreaDetailPage', () => {
  beforeEach(() => {
    cy.viewport(1200, 800)

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, {
          area: MOCK_AREA,
        })
      }
    })
  })

  it('renders the page title and button correctly', () => {
    cy.mountWithProviders(<AreaDetailPage />)
    cy.contains('pages.areas.areaDetail.title').should('be.visible')
    cy.contains('pages.areas.areaDetail.EditAreaButton').should('be.visible')
  })

  it('displays the correct area details from mock data', () => {
    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')

    cy.contains(MOCK_AREA.code).should('be.visible')
    cy.contains(MOCK_AREA.name).should('be.visible')
    cy.contains(MOCK_AREA.address.country.name).should('be.visible')
    cy.contains(MOCK_AREA.address.postCode).should('be.visible')
    cy.contains(MOCK_AREA.address.city).should('be.visible')
    cy.contains(MOCK_AREA.address.address).should('be.visible')
    cy.contains(MOCK_AREA.dms.name).should('be.visible')
    cy.contains(MOCK_AREA.crm.name).should('be.visible')
    cy.contains('active').should('be.visible')
  })

  it('handles errors gracefully', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        errorResponse(req, {
          message: 'Error fetching area details',
          path: ['area'],
          extensions: { code: 'NOT_FOUND' },
        })
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')

    cy.contains('Error fetching area details').should('be.visible')
  })

  it('renders a loading state while data is being fetched', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        // Simulate network delay
        return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
          successResponse(req, {
            area: MOCK_AREA,
          }),
        )
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.contains('is Loading...').should('be.visible')
    cy.wait('@gqlGetAreaQuery')
  })

  it('shows "No data" when area details are unavailable', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, {
          area: null,
        })
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')

    cy.contains('No data').should('be.visible')
  })
})
