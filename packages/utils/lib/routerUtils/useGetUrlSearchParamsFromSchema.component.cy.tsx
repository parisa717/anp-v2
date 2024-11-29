import { z } from 'zod'

import { useGetUrlSearchParamsFromSchema } from './useGetUrlSearchParamsFromSchema'

const TestComponent = ({ schema }: { schema: z.Schema }) => {
  const params = useGetUrlSearchParamsFromSchema(schema)

  return (
    <div>
      <p>Page: {params.page}</p>
      <p>Query: {params.query}</p>
      <p>Filter: {params.filter ?? 'none'}</p>
      <p>Required: {params.required}</p>
      <p>Optional: {params.optional ?? 'none'}</p>
      <p>Numbers: {params.numbers?.join(',') ?? 'none'}</p>
      <p>Boolean: {String(params.boolean)}</p>
      <button>Trigger Error</button>
    </div>
  )
}

describe('useGetUrlSearchParamsFromSchema', () => {
  it('should parse valid URL parameters according to schema', () => {
    const testSchema = z.object({
      page: z.string().transform(Number),
      query: z.string(),
      filter: z.string().optional(),
    })

    cy.mountWithProviders(<TestComponent schema={testSchema} />, {
      initialRouteEntries: ['/search?page=1&query=test&filter=active'],
      route: '/search',
    })

    cy.get('p').contains('Page: 1')
    cy.get('p').contains('Query: test')
    cy.get('p').contains('Filter: active')
  })

  it('should handle missing optional parameters', () => {
    const testSchema = z.object({
      required: z.string(),
      optional: z.string().optional(),
    })

    cy.mountWithProviders(<TestComponent schema={testSchema} />, {
      initialRouteEntries: ['/search?required=value'],
      route: '/search',
    })

    cy.get('p').contains('Required: value')
    cy.get('p').contains('Optional: none')
  })

  it('should handle type transformations', () => {
    const testSchema = z.object({
      numbers: z.string().transform((val) => val.split(',').map(Number)),
      boolean: z.string().transform((val) => val === 'true'),
    })

    cy.mountWithProviders(<TestComponent schema={testSchema} />, {
      initialRouteEntries: ['/search?numbers=1,2,3&boolean=true'],
      route: '/search',
    })

    cy.get('p').contains('Numbers: 1,2,3')
    cy.get('p').contains('Boolean: true')
  })

  it('should handle empty search parameters', () => {
    const testSchema = z.object({
      param: z.string().optional(),
    })

    cy.mountWithProviders(<TestComponent schema={testSchema} />, {
      initialRouteEntries: ['/search'],
      route: '/search',
    })

    cy.get('p').should('not.contain', 'Param:')
  })
})
