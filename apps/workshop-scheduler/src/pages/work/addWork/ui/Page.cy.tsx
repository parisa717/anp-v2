import { AddWorkPage } from './Page'

const STEP_CONTENT = '[data-cy="step-content"]'
const NEXT_BUTTON = 'button[aria-label="Next"]'

describe('AddWorkPage', () => {
  beforeEach(() => {
    cy.mountWithProviders(<AddWorkPage />)
  })

  it('renders the content with the first step active by default', () => {
    cy.contains('Define service setup').should('be.visible')
    cy.get(STEP_CONTENT).contains('Define service setup').should('be.visible')
  })

  it('do not navigate navigate between steps when clicking on the stepper step and form is invalid', () => {
    cy.contains('Assign locations').click()
    cy.contains('Assign Locations Form').should('not.exist')
  })

  it('navigates between steps when clicking on the stepper step and form is valid', () => {
    cy.get('input[name="works.0.name"]').type('Test')
    cy.get('#works\\.0\\.qualificationId').click()
    cy.contains('Mechanics').click()

    cy.contains('Assign locations').click()
    cy.get(STEP_CONTENT).contains('Assign Locations Form').should('be.visible')

    cy.contains('Define service setup').click()
    cy.get(STEP_CONTENT).contains('Define service setup').should('be.visible')
  })

  it('navigates to the next step when form is valid and Next button is clicked', () => {
    cy.get('input[name="works.0.name"]').type('Test')
    cy.get('#works\\.0\\.qualificationId').click()
    cy.contains('Mechanics').click()

    cy.get(STEP_CONTENT).contains('Define service setup').should('be.visible')
    cy.get(NEXT_BUTTON).click()
    cy.get(STEP_CONTENT).contains('Assign Locations Form').should('be.visible')
  })

  it('do not navigate to the next step when Next button is clicked and form is invalid', () => {
    cy.get(STEP_CONTENT).contains('Define service setup').should('be.visible')

    cy.get(NEXT_BUTTON).click()

    cy.contains('Assign Locations Form').should('not.exist')
  })
})
