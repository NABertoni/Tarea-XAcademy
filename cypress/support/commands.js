Cypress.Commands.add('submitEmptyForm', () => {
    cy.get('#submitContact').click()
    cy.get('.alert').should('be.visible')
    cy.get('p').contains('Subject must be between 5 and 100 characters.')
    cy.get('p').contains('Subject may not be blank')
    cy.get('p').contains('Name may not be blank')
    cy.get('p').contains('Message must be between 20 and 2000 characters.')
    cy.get('p').contains('Message may not be blank')
    cy.get('p').contains('Email may not be blank')
    cy.get('p').contains('Phone may not be blank')
    cy.get('p').contains('Phone must be between 11 and 21 characters.')
})

Cypress.Commands.add('submitIncorrectData', () => {
    cy.get('input[placeholder="Name"]').type('asd')
    cy.get('input[placeholder="Email"]').type('asdasd')
    cy.get('input[placeholder="Phone"]').type('asdasd')
    cy.get('input[placeholder="Subject"]').type('asdasd')
    cy.get('[data-testid="ContactDescription"]').type('asdasd')
    cy.get('#submitContact').click()
    cy.get('.alert').should('be.visible')
    cy.get('p').contains('Phone must be between 11 and 21 characters.')
    cy.get('p').contains('debe ser una dirección de correo electrónico con formato correcto')
    cy.get('p').contains('Message must be between 20 and 2000 characters.')
})

Cypress.Commands.add('submitCorrectData', () => {
    cy.get('input[placeholder="Name"]').type('Juan Pérez')
    cy.get('input[placeholder="Email"]').type('juan@gmail.com')
    cy.get('input[placeholder="Phone"]').type('35123696457')
    cy.get('input[placeholder="Subject"]').type('Reserva de habitación para fecha X')
    cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo')
    cy.get('#submitContact').click()
})




Cypress.Commands.add('verifyHotelDescription',  () => {
    // Verifica que el texto 'Shady Meadows B&B' esté presente
    cy.get('p').contains('Shady Meadows B&B')
        
        .and('include.text', 'Shady Meadows B&B')

    // Tiene que Verificar que el texto 'The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S' esté presente
    cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S')
        
        .and('include.text', 'The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S')

    // Verifica que el texto '012345678901' esté presente
    cy.get('p').contains('01234567890')
        
        .and('include.text', '012345678901')

    // Verifica que el texto 'fake@fakeemail.com' esté presente
    cy.get('p').contains('fake@fakeemail.com')
        
        .and('include.text', 'fake@fakeemail.com')
})




Cypress.Commands.add('verifyImageVisibility', () => {
    cy.get('img')
        .should('exist') 
        .and(($img) => {
            
            const visibleImages = $img.filter((_, img) => Cypress.$(img).is(':visible'));
            expect(visibleImages.length).to.be.greaterThan(0, 'No hay imágenes visibles en la página');
        });

    


Cypress.Commands.add('verifyHotelDescriptionText', () => {
    const expectedText = "Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.";

    // Ajusta el selector para que coincida con el elemento de la descripción del hotel
    cy.get('p') // Reemplaza con el selector correcto de la descripción
        .should('be.visible') // Verifica que el elemento esté visible
        .and('include.text', expectedText); // Verifica que el texto esté incluido
});

});

