import { createRandomUser } from '../utils/helpers'

describe('Sign up', () => {
  let testUser
  let auth = {
    id: null,
    token: null,
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
