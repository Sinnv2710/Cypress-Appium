Cypress.Commands.add('initAppium', () => {
  cy.task('appium').then((result) => {
    cy.log(result)
  })
})