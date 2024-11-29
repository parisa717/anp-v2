import {
  GET_AREAS_OPERATION_DEFAULT_RESPONSE as AREAS,
  GET_CRM_OPERATION_DEFAULT_RESPONSE as CRMS,
  GET_DMS_OPERATION_DEFAULT_RESPONSE as DMSS,
} from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { AreaDTO } from '@/entities/area/api/types'

import { AreasListPage } from './Page'

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const SORT = '[data-pc-section="sort"]'
const FILTER = '[data-cy="search-input"]'
const DROPDOWN = '[data-cy="datatable-dropdown"]'

const sortTable = (colIndex: number, base: string[], sorted: string[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastBase)

  // Ascending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastSorted)

  // Descending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', lastSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', firstSorted)

  // Default
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastBase)
}

const filterTableBySearch = (colIndex: number, query: string, lengthBeforeQuery: number, lengthAfterQuery: number) => {
  cy.get(ROW).should('have.length', lengthBeforeQuery)

  cy.get(FILTER).eq(colIndex).focus().realType(query)
  cy.get(ROW).should('have.length', lengthAfterQuery)

  cy.get(FILTER).eq(colIndex).focus().clear()
  cy.get(ROW).should('have.length', lengthBeforeQuery)
}

const filterTableByDropdown = (
  colIndex: number,
  query: string,
  lengthBeforeQuery: number,
  lengthAfterQuery: number,
) => {
  const CLEAR = '[data-pc-section="clearicon"]'
  const ITEM = '[data-pc-section="item"]'

  cy.get(ROW).should('have.length', lengthBeforeQuery)

  cy.get(DROPDOWN).eq(colIndex).realClick()
  cy.get(ITEM).contains(query, { matchCase: false }).realClick()
  cy.get(ROW).should('have.length', lengthAfterQuery)

  cy.get(DROPDOWN).find(CLEAR).realClick()
  cy.get(ROW).should('have.length', lengthBeforeQuery)
}

describe('AreasListPage', () => {
  beforeEach(() => {
    cy.viewport(1200, 800)

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetAreas')
    })
  })

  it('renders the table with areas', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        successResponse(req, {
          areas: AREAS,
        })
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetAreasQuery')

    const getAreaFields = (area: AreaDTO) => [
      area.id,
      area.name,
      area.address.country.name,
      area.dms.name,
      area.crm.name,
      area.address.postCode,
      area.address.city,
      area.address.address,
      area.isActive ? 'active' : 'inactive',
    ]

    AREAS?.forEach((area, areaIndex) => {
      getAreaFields(area).forEach((field, fieldIndex) => {
        cy.get(ROW).eq(areaIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
  })

  it('sorts the table on all fields', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        successResponse(req, {
          areas: AREAS,
        })
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetAreasQuery')

    sortTable(0, ['94', '80'], ['02', '94'])
    sortTable(1, ['Konklux', 'Stim'], ['Alpha', 'Trippledex'])
    sortTable(2, ['Poland', 'Austria'], ['Austria', 'Poland'])
    sortTable(3, ['AT Carlo', 'PL Carlo'], ['AT Carlo', 'PL Carlo'])
    sortTable(4, ['DE Catch', 'AT Catch'], ['AT Catch', 'PL Catch'])
    sortTable(5, ['22-604', '84-240'], ['05-090', '95-063'])
    sortTable(6, ['Tarnawatka', 'Reda'], ['Kołaczyce', 'Wilczyce'])
    sortTable(7, ['968 Kensington Terrace', '03590 Delaware Drive'], ['9 Springview Drive', '72810 Kings Street'])
    sortTable(8, ['inactive', 'active'], ['inactive', 'active'])
  })

  it('filters the table on all fields', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetCrms')

      if (hasOperationName(req, 'GetCrms')) {
        aliasQuery(req, 'GetCrms')
        successResponse(req, {
          crms: CRMS,
        })
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetDmss')

      if (hasOperationName(req, 'GetDmss')) {
        aliasQuery(req, 'GetDmss')
        successResponse(req, {
          dmss: DMSS,
        })
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        successResponse(req, {
          areas: AREAS,
        })
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetCrmsQuery')
    cy.wait('@gqlGetDmssQuery')
    cy.wait('@gqlGetAreasQuery')

    filterTableBySearch(0, '6', 10, 2)
    filterTableBySearch(0, '64', 10, 1)
    filterTableBySearch(1, 'lot', 10, 2)
    filterTableBySearch(1, 'lots', 10, 1)
    filterTableBySearch(2, 'p', 10, 5)
    filterTableByDropdown(0, 'AT Carlo', 10, 3)
    filterTableByDropdown(1, 'DE Catch', 10, 4)
    filterTableBySearch(3, '2', 10, 2)
    filterTableBySearch(3, '22', 10, 1)
    filterTableBySearch(4, 'o', 10, 2)
    filterTableBySearch(4, 'ol', 10, 1)
    filterTableBySearch(5, '9', 10, 2)
    filterTableBySearch(5, '96', 10, 1)
    filterTableByDropdown(2, 'Active', 10, 3)
  })

  it('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetAreasQuery')

    cy.contains('No areas found').should('be.visible')
  })
})
