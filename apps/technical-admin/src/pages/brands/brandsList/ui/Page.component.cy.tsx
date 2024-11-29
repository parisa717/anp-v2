import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { BrandsListPage } from '@/pages/brands/brandsList/ui/Page'

describe('BrandsListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasQuery(req, 'GetBrands')
    })
  })

  it('renders the table with rows', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, {
          getBrands: {
            data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
          },
        })
      }
    })

    cy.mountWithProviders(<BrandsListPage />)
    cy.wait('@gqlGetBrandsQuery')

    cy.get('[data-pc-section="bodyrow"]').should('have.length', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.length)

    cy.get('[data-pc-section="bodyrow"]')
      .eq(0)
      .find('[data-pc-section="bodycell"]')
      .eq(0)
      .should('contain.text', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.[0]?.code)

    cy.get('[data-pc-section="bodyrow"]')
      .eq(1)
      .find('[data-pc-section="bodycell"]')
      .eq(0)
      .should('contain.text', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.[1]?.code)
  })

  it('renders the table with brand names', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, {
          getBrands: {
            data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
          },
        })
      }
    })

    cy.mountWithProviders(<BrandsListPage />)
    cy.wait('@gqlGetBrandsQuery')

    cy.get('[data-pc-section="bodyrow"]')
      .eq(0)
      .find('[data-pc-section="bodycell"]')
      .eq(0)
      .should('contain.text', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.[0]?.code)

    cy.get('[data-pc-section="bodyrow"]')
      .eq(1)
      .find('[data-pc-section="bodycell"]')
      .eq(0)
      .should('contain.text', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.[1]?.code)
  })

  describe('sorts the table correctly', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, {
            getBrands: {
              data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
            },
          })
        }
      })

      cy.mountWithProviders(<BrandsListPage />)
      cy.wait('@gqlGetBrandsQuery')
    })

    it('should sort names', () => {
      // Ascending
      cy.get('[data-pc-section="sort"]').eq(0).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.toSorted((a, b) => a?.code?.localeCompare(b?.code ?? '') ?? 0).forEach(
        (brand, index) => {
          cy.get('[data-pc-section="bodyrow"]')
            .eq(index)
            .find('[data-pc-section="bodycell"]')
            .eq(0)
            .should('contain.text', brand?.code)
        },
      )

      // Descending
      cy.get('[data-pc-section="sort"]').eq(0).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.toSorted((a, b) => (b?.code ?? '').localeCompare(a?.code ?? '')).forEach(
        (brand, index) => {
          cy.get('[data-pc-section="bodyrow"]')
            .eq(index)
            .find('[data-pc-section="bodycell"]')
            .eq(0)
            .should('contain.text', brand?.code)
        },
      )

      // Goes back to default
      cy.get('[data-pc-section="sort"]').eq(0).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.forEach((brand, index) => {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(0)
          .should('contain.text', brand?.code)
      })
    })

    it('should sort status', () => {
      // Ascending
      cy.get('[data-pc-section="sort"]').eq(1).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.toSorted((a, b) => (a?.isActive ? 1 : 0) - (b?.isActive ? 1 : 0)).forEach(
        (brand, index) => {
          cy.get('[data-pc-section="bodyrow"]')
            .eq(index)
            .find('[data-pc-section="bodycell"]')
            .eq(1)
            .should('contain.text', brand?.isActive ? 'active' : 'inactive')
        },
      )

      // Descending
      cy.get('[data-pc-section="sort"]').eq(1).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.toSorted((a, b) => (b?.isActive ? 1 : 0) - (a?.isActive ? 1 : 0)).forEach(
        (brand, index) => {
          cy.get('[data-pc-section="bodyrow"]')
            .eq(index)
            .find('[data-pc-section="bodycell"]')
            .eq(1)
            .should('contain.text', brand?.isActive ? 'active' : 'inactive')
        },
      )

      // Goes back to default
      cy.get('[data-pc-section="sort"]').eq(1).click()

      GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.forEach((brand, index) => {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(1)
          .should('contain.text', brand?.isActive ? 'active' : 'inactive')
      })
    })
  })

  describe('filters the table correctly', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        aliasQuery(req, 'GetBrands')
        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, {
            getBrands: {
              data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
            },
          })
        }
      })

      cy.mountWithProviders(<BrandsListPage />)
      cy.wait('@gqlGetBrandsQuery')
    })

    it('filters the table by name', () => {
      const filterName = GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.[0]?.code ?? ''

      cy.get('[data-pc-section="bodyrow"]').should('have.length', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.length)

      cy.get('input[name="name"]').type(filterName)

      cy.get('[data-pc-section="bodyrow"]').should('have.length', 1)
      cy.get('[data-pc-section="bodyrow"]')
        .eq(0)
        .find('[data-pc-section="bodycell"]')
        .eq(0)
        .should('contain.text', filterName)
    })

    it('filters the table by status', () => {
      const activeBrands = GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.filter((brand) => brand?.isActive)
      const inactiveBrands = GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.filter((brand) => !brand?.isActive)

      // Filter by active status
      cy.get('[data-pc-name="dropdown"]').click()
      cy.get('li[role="option"][aria-label="Active"]').click()

      cy.get('[data-pc-section="bodyrow"]').should('have.length', activeBrands?.length)
      activeBrands?.forEach((_, index) => {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(1)
          .should('contain.text', 'active')
      })

      // Filter by inactive status
      cy.get('[data-pc-section="clearicon"]').click()
      cy.get('[data-pc-name="dropdown"]').click()
      cy.get('li[role="option"][aria-label="Inactive"]').click()

      cy.get('[data-pc-section="bodyrow"]').should('have.length', inactiveBrands?.length)
      inactiveBrands?.forEach((_, index) => {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(1)
          .should('contain.text', 'inactive')
      })

      // Filter by all
      cy.get('[data-pc-section="clearicon"]').click()
      cy.get('[data-pc-section="bodyrow"]').should('have.length', GET_BRANDS_OPERATION_DEFAULT_RESPONSE?.length)
    })

    it('shows empty state when no results are found', () => {
      cy.get('input[name="name"]').type('Non-existing brand')

      cy.contains('No brands found').should('be.visible')
    })
  })

  it('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<BrandsListPage />)
    cy.wait('@gqlGetBrandsQuery')

    cy.contains('No brands found').should('be.visible')
  })
})
