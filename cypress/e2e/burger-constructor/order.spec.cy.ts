/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
Cypress.config('defaultCommandTimeout', 20000)

describe('burger constructor', function() {
    it('should work', function() {
        // Login page
        cy.visit('/login')

        cy.intercept({ url: `**/auth/user` }).as('checkAuth')
        cy.intercept({ url: `**/ingredients` }).as('getIngredients')
        cy.intercept({ url: `**/auth/login` }).as('login')

        cy.wait('@checkAuth')

        // Input credentials
        cy.get('input[type="email"]').type('jiroler@gmail.com')
        cy.get('input[type="password"]').type('666666')
        cy.get('button[type="submit"]').click()

        cy.wait('@login')

        // Redirect
        cy.wait(['@getIngredients', '@checkAuth'])
        cy.wait(1000)
        cy.contains('Соберите бургер')

        // Get containers and ingredients
        cy.get('[class^=burger-ingredients_ingredients]').as('ingredients')
        cy.get('[class^=burger-constructor_items]').as('constructor')

        cy.get('@ingredients').find('p').contains('Краторная').parent().as('bun')
        cy.get('@ingredients').find('p').contains('галактический').parent().as('sauce')
        cy.get('@ingredients').find('p').contains('Говяжий').parent().as('component')

        // Ingredient details (open/close)
        cy.get('@bun').click()
        cy.get('[class^=modal_modal]').find('p').contains('Краторная')
        cy.get('[class^=modal_close]').click()
        cy.get('[class^=modal_modal]').should('not.exist')

        // Add ingredients to constructor
        cy.get('@bun').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@sauce').trigger('dragstart')
        cy.get('@constructor').trigger('drop')
        cy.get('@component').trigger('dragstart')
        cy.get('@constructor').trigger('drop')

        // Make an order
        cy.get('[class^=order-summary]').find('button').as('orderButton')
        cy.get('@orderButton').click()

        // Success! (open/close order modal)
        cy.get('[class^=modal_modal]').find('p').contains('Ваш заказ начали готовить')
        cy.get('[class^=modal_close]').click()
        cy.get('[class^=modal_modal]').should('not.exist')
    })
})
