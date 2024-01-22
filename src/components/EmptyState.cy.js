// EmptyState.spec.js

import { mount } from '@cypress/vue'
import EmptyState from './EmptyState.vue'
import '@/assets/styles.css' // Assuming this is where your Tailwind CSS is imported

describe('<EmptyState /> Component Testing', () => {
  it('renders correctly with all props', () => {
    const image =
      'https://img.pokemondb.net/sprites/scarlet-violet/normal/psyduck.png'
    const title = 'Psyduck used Confusion!'
    const message =
      "There's no results for your search, Try doing a different search"

    mount(EmptyState, {
      propsData: {
        image,
        title,
        message,
      },
    })

    cy.get('img').should('have.attr', 'src', image).and('be.visible')
    cy.get('h3').should('have.text', title)
    cy.get('p').should('have.text', message)
  })

  it('renders slot content if provided', () => {
    const slotContent = '<button>Browse Cards</button>'

    mount(EmptyState, {
      propsData: {
        image:
          'https://img.pokemondb.net/sprites/scarlet-violet/normal/psyduck.png',
        title: 'Empty State Title',
        message: 'Empty State Message',
      },
      slots: {
        default: slotContent,
      },
    })
    cy.get('button').should('have.text', 'Browse Cards')
  })
})
