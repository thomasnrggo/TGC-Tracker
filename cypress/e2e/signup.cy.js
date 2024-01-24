describe('User Registration', () => {
  it('should allow a new user to register', () => {
    const randomSuffix = Math.random().toString(36).substring(2, 7)
    const testEmail = `newuser+${randomSuffix}@example.com`
    const testUsername = `newUser${randomSuffix}`

    cy.intercept('POST', '/api/v1/auth/signup').as('registerUser')

    cy.visit('/signup')
    cy.get('input[name=username]').type(testUsername)
    cy.get('input[name=email]').type(testEmail)
    cy.get('input[name=password]').type('password')
    cy.get('form').submit()

    cy.get('#loader').should('be.visible')

    cy.wait('@registerUser').then((response) => {
      const userId = response.response.body.user._id
      const token = response.response.body.token
      cy.wrap(userId).as('newUserId')
      cy.wrap(token).as('token')
    })

    cy.url().should('include', '/')

    cy.get('@newUserId').then((userId) => {
      cy.get('@token').then((token) => {
        cy.request({
          method: 'DELETE',
          url: `https://tgc-tracker-api.vercel.app/api/v1/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      })
    })
  })

  it('should display an error for already registered user', () => {
    cy.visit('/signup')
    cy.get('input[name=username]').type(Cypress.env('TEST_USER_USERNAME'))
    cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('input[name=password]').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('form').submit()

    cy.get('#loader').should('be.visible')

    cy.contains('User already exists').should('be.visible')
  })
})
