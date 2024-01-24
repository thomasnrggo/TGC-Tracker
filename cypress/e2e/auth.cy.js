describe('Authentication Flow', () => {
  let testUser
  let auth = {
    id: null,
    token: null,
  }

  const createRandomUser = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 7)
    return {
      username: `testUser${randomSuffix}`,
      email: `test+${randomSuffix}@example.com`,
      password: 'password123',
    }
  }

  beforeEach(() => {
    testUser = createRandomUser()
  })

  afterEach(() => {
    if (testUser.userId && testUser.token) {
      cy.request({
        method: 'DELETE',
        url: `https://tgc-tracker-api.vercel.app/api/v1/users/${testUser.userId}`,
        headers: {
          Authorization: `Bearer ${testUser.token}`,
        },
      })
    }
    auth = {
      id: null,
      token: null,
    }
  })

  describe('Sign up', () => {
    it('should allows a user to sign up', () => {
      cy.intercept('POST', '/api/v1/auth/signup').as('registerUser')

      cy.visit('/signup')
      cy.get('input[name=username]').type(testUser.username)
      cy.get('input[name=email]').type(testUser.email)
      cy.get('input[name=password]').type(testUser.password)
      cy.get('form').submit()

      cy.get('#loader').should('be.visible')

      cy.wait('@registerUser').then((response) => {
        auth.id = response.response.body.user._id
        auth.token = response.response.body.token
      })

      cy.url().should('include', '/')
    })

    it('should show an error message for already registered user', () => {
      cy.visit('/signup')
      cy.get('input[name=username]').type(Cypress.env('TEST_USER_USERNAME'))
      cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
      cy.get('input[name=password]').type(Cypress.env('TEST_USER_PASSWORD'))
      cy.get('form').submit()

      cy.get('#loader').should('be.visible')

      cy.contains('User already exists').should('be.visible')
    })
  })

  describe('Login', () => {
    it('should allows a user to login', () => {
      cy.visit('/login')
      cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
      cy.get('input[name=password]').type(Cypress.env('TEST_USER_PASSWORD'))
      cy.get('form').submit()

      cy.get('#loader').should('be.visible')

      cy.url().should('include', '/')
      cy.get('a[href="/profile"]').should('be.visible')
    })

    it('should show error message if user enters invalid credentials', () => {
      cy.intercept('POST', '/api/v1/auth/login').as('loginUser')

      cy.visit('/login')
      cy.get('input[name=email]').type(Cypress.env('TEST_USER_EMAIL'))
      cy.get('input[name=password]').type(
        Cypress.env('TEST_USER_PASSWORD') + '1',
      )
      cy.get('form').submit()

      cy.get('#loader').should('be.visible')

      cy.wait('@loginUser').then((response) => {
        expect(response.response.body.message).to.equal('Authentication failed')
      })
    })
  })

  describe('Logout', () => {
    it('should allows a user to logout', () => {
      cy.login(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD'),
      ).then(() => {
        cy.visit('/')

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
})
