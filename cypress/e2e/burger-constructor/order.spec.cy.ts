/* eslint-disable cypress/no-unnecessary-waiting */
Cypress.config('defaultCommandTimeout', 20000)

describe('burger constructor', function() {
    it('should work', function() {
        // Login page
        cy.visit('/login')

        cy.intercept({ url: `**/auth/user` }).as('checkAuth')
        cy.intercept({ url: `**/ingredients` }).as('getIngredients')
        cy.intercept({ url: `**/auth/login` }).as('login')

        cy.wait('@checkAuth').then(() => {
            // Input credentials
            cy.get('input[type="email"]').type('jiroler@gmail.com')
            cy.get('input[type="password"]').type('666666')
            cy.get('button[type="submit"]').click()

            cy.wait('@login').then(() => {
                // Redirect
                cy.wait(['@getIngredients', '@checkAuth']).then(() => {
                    cy.contains('Соберите бургер')

                    // Some waiting to dnd works
                    cy.wait(1000).then(() => {
                        // Add ingredients to constructor
                        cy.get('[class^=burger-ingredients_ingredients]').as('ingredients')
                        cy.get('[class^=burger-constructor_items]').as('constructor')

                        cy.get('@ingredients').find('p').contains('Краторная').as('bun')
                        cy.get('@ingredients').find('p').contains('галактический').as('sauce')
                        cy.get('@ingredients').find('p').contains('Говяжий').as('component')

                        cy.get('@bun').trigger('dragstart')
                        cy.get('@constructor').trigger('drop')
                        cy.get('@sauce').trigger('dragstart')
                        cy.get('@constructor').trigger('drop')
                        cy.get('@component').trigger('dragstart')
                        cy.get('@constructor').trigger('drop')

                        // Make an order
                        cy.get('[class^=order-summary]').find('button').as('orderButton')
                        cy.get('@orderButton').click()

                        // Success!
                        cy.get('[class^=modal_modal]').find('p').contains('Ваш заказ начали готовить')
                    })
                })
            })
        })
    })
})
