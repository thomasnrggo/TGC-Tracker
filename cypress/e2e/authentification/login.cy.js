describe('User Login', () => {
  it('should allow a registered user to login', () => {
    cy.visit('/login')
    cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('input[name=password]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('form').submit()

    cy.get('#loader').should('be.visible')

    cy.url().should('include', '/')
  })

  it('should show error message if user enters invalid credentials', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginUser')

    cy.visit('/login')
    cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('input[name=password]').type(Cypress.env('TEST_USER_PASSWORD') + '1')
    cy.get('form').submit()

    cy.get('#loader').should('be.visible')

    cy.wait('@loginUser').then((response) => {
      expect(response.response.body.message).to.equal('Authentication failed')
    })

    cy.contains('Authentication failed').should('be.visible')
  })

  it('should display an error for invalid user', () => {
    cy.intercept('POST', '/api/v1/auth/login').as('loginUser')

    cy.visit('/login')
    cy.get('input[name=email]').type('noone@mail.com')
    cy.get('input[name=password]').type('wrongpassword')
    cy.get('form').submit()

    cy.get('#loader').should('be.visible')

    cy.wait('@loginUser').then((response) => {
      expect(response.response.body.message).to.equal('User does not exist')
    })

    cy.contains('User does not exist').should('be.visible')
  })
})
