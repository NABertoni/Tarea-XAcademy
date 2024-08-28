Cypress.Commands.add('verifyHotelInfo', (descriptionText) => {
    cy.get('.hotel-name').should('be.visible')
    cy.get('.hotel-images img').should('have.length.greaterThan', 0)
    cy.get('.hotel-description').should('contain.text', descriptionText)
})
