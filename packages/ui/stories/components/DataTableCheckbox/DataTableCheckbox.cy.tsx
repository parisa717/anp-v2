import { ColumnFilterElementTemplateOptions } from 'primereact/column'

import { DataTableCheckbox } from './DataTableCheckbox'

const restColumnFilterElementTemplateOptions: Omit<
  ColumnFilterElementTemplateOptions,
  'value' | 'filterApplyCallback'
> = {
  filterModel: {},
  filterCallback: () => {},
  index: 0,
  field: 'connected',
}

describe('DataTableCheckbox', () => {
  it('renders the component with the correct initial checked state', () => {
    cy.mount(
      <DataTableCheckbox value={true} filterApplyCallback={() => {}} {...restColumnFilterElementTemplateOptions} />,
    )
    cy.get('input[type="checkbox"]').should('be.checked')

    cy.mount(
      <DataTableCheckbox value={false} filterApplyCallback={() => {}} {...restColumnFilterElementTemplateOptions} />,
    )
    cy.get('input[type="checkbox"]').should('not.be.checked')
  })

  it('calls filterApplyCallback with proper value when checked', () => {
    const handleFilterApplyCallback = cy.spy().as('handleFilterApplyCallback')

    cy.mount(
      <DataTableCheckbox
        value={false}
        filterApplyCallback={handleFilterApplyCallback}
        {...restColumnFilterElementTemplateOptions}
      />,
    )

    cy.get('input[type="checkbox"]').check({ force: true })
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', true)
  })

  it('resets the filter when unchecked to show all items', () => {
    const handleFilterApplyCallback = cy.spy().as('handleFilterApplyCallback')

    cy.mount(
      <DataTableCheckbox
        value={true}
        filterApplyCallback={handleFilterApplyCallback}
        {...restColumnFilterElementTemplateOptions}
      />,
    )

    cy.get('input[type="checkbox"]').uncheck()
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', false)
  })
})
