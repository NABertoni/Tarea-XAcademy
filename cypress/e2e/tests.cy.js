// cypress/e2e/contactForm.spec.js

describe('Enviar mensaje', () => {

    // Visita la página antes de cada prueba
    beforeEach(() => {
        cy.visit('https://automationintesting.online/')
    })

    it('Validar envío de form vacío', () => {
        cy.log('Envío de form de contacto en blanco...')
        cy.submitEmptyForm()
    })

    it('Validar envío de form con data incorrecta', () => {
        cy.log('Set de datos incorrectos...')
        cy.submitIncorrectData()
    })

    it('Validar envío de form con data correcta', () => {
        cy.log('Set de datos correctos...')
        cy.submitCorrectData()
    })



    it('Confirmar que la información del hotel sea la esperada', () => {
         cy.verifyHotelDescription()
})
    // Ejemplo adicional de validación de mensaje enviado mediante la API, si es requerido.



it('Debe haber al menos una imagen visible', () => {
    cy.verifyImageVisibility(); 
});


it('Debe mostrar la descripción esperada del hotel', () => {
    cy.verifyHotelDescriptionText(); // Llama al comando para verificar el texto de la descripción
});
});
