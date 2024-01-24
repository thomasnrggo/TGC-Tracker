// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  const loginUrl = 'https://tgc-tracker-api.vercel.app/api/v1/auth/login'

  console.log(email, password)

  cy.request({
    method: 'POST',
    url: loginUrl,
    failOnStatusCode: false,
    body: {
      email: email,
      password: password,
    },
  }).then((resp) => {
    if (resp.status === 200) {
      expect(resp.body).to.have.property('token')
      expect(resp.body).to.have.property('user')

      cy.window().then((window) => {
        window.sessionStorage.setItem('token', resp.body.token)
        window.sessionStorage.setItem('user', JSON.stringify(resp.body.user))
      })
    } else {
      // Handle non-200 responses, e.g., log the error for debugging
      console.error('Login failed', resp)
    }
  })
})
