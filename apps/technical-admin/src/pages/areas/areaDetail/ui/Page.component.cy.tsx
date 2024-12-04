import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { GqlAreaObjectTypeEntity } from '@/entities/area'

import { AreaDetailPage } from './page'

const AREA_TABLE = '[data-cy="area-table"]'
const CELL = '[data-pc-section="bodycell"]'

export const GET_AREA_OPERATION_DEFAULT_RESPONSE = {
  getArea: {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
    address: {
      id: '1',
      country: {
        id: '1',
        name: 'Germany',
      },
      postCode: '00000',
      city: 'Markkleeberg',
      address: 'Magdeborner Str. 12',
    },
    dms: {
      id: 'dms_1',
      name: 'DMS System',
    },
    crm: {
      id: 'crm_1',
      name: 'CRM System',
    },
    isActive: false,
  },
}

const AREA_DATA = GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea

const verifyTableRendering = (tableSelector: string, columnsData: string[]) => {
  cy.get(tableSelector)
    .find(CELL)
    .each((cell, index) => {
      cy.wrap(cell).should('contain.text', columnsData[index])
    })
}

describe('AreaDetailsPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, GET_AREA_OPERATION_DEFAULT_RESPONSE)
        const getAreaFields = (area: GqlAreaObjectTypeEntity) => [
          area.code,
          area.name,
          area.address.country.name,
          area.dms.name,
          area.crm.name,
          area.address.postCode,
          area.address.city,
          area.address.address,
          area.isActive ? 'active' : 'inactive',
        ]
        verifyTableRendering(AREA_TABLE, getAreaFields(AREA_DATA))
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')
  })

  it('renders an empty message when no area data is available', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, { getArea: null })
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')
    cy.contains('No area details found').should('be.visible')
  })
})
