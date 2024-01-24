describe('Logout', () => {
  it('should allows a user to logout', () => {
    cy.login(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD'),
    ).then(() => {
      cy.visit('/')

      // Verify user exist in sessionStorage
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'user')
        .should('not.be.null')
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'token')
        .should('not.be.null')

      cy.get('a[href="/profile"]').should('be.visible')

      cy.visit('/profile')
      cy.get('button').contains('Logout').click()

      cy.url().should('include', '/')

      cy.get('a[href="/login"]').should('be.visible')

      // Verify that sessionStorage is cleared
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'user')
        .should('be.null')
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'token')
        .should('be.null')
    })
  })
})
