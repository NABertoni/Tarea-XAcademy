describe('Pruebas en el sitio Automation in Testing', { testIsolation: false }, () => {

    // 1. Verificar que la información del hotel esté presente
    it('Verificar que la información del hotel esté presente', () => {
        cy.visit('https://automationintesting.online/')
        cy.log('Verificando la información del hotel...')
        cy.get('.contact > :nth-child(3) > :nth-child(1)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(2)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(3)').should('be.visible')
        cy.get('.contact > :nth-child(3) > :nth-child(4)').should('be.visible')

        // Verifica que el nombre del hotel esté presente
        cy.get('.hotel-logoUrl').should('be.visible')

        // Verifica que haya al menos una imagen visible
        cy.get('.hotel-logoUrl').should('have.length.greaterThan', 0)
        cy.get('.img-responsive').should('have.length.greaterThan', 0)

        // Verifica que la descripción del hotel sea la esperada
        cy.get('.col-sm-10 > p').should('contain.text', 'Welcome to Shady Meadows, a delightful Bed & Breakfast in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. AAll our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. it is a delightful place.')
    })


    it('Verificación de la información del hotel usando un comando personalizado', () => {
        cy.visit('https://automationintesting.online/')
        cy.verifyHotelInfo('Expected hotel description text')
    })

    // 3. Validar envío de formulario con datos vacíos
    it('Validar envío de form vacío', () => {
        cy.log('Envío de form de contacto en blanco...')
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

    // 4. Validar envío de formulario con datos incorrectos
    it('Validar envío de form con data incorrecta', () => {
        cy.log('Set de datos incorrectos...')
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

    // 5. Validar envío de formulario con datos correctos
    it('Validar envío de form con data correcta', () => {
        cy.log('Set de datos correctos...')
        cy.get('input[placeholder="Name"]').type('Juan Pérez')
        cy.get('input[placeholder="Email"]').type('juan@gmail.com')
        cy.get('input[placeholder="Phone"]').type('35123696457')
        cy.get('input[placeholder="Subject"]').type('Reserva de habitación para fecha X')
        cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo') 
        cy.get('#submitContact').click()
    })

    // 6. Interactuar con APIs para verificar el estado y enviar datos
    it('Verificar el estado de la API de contacto', () => {
        cy.request('GET', 'https://automationintesting.online/contact').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Enviar datos de contacto a través de la API', () => {
        cy.request('POST', 'https://automationintesting.online/contact', {
            name: 'Juan Pérez',
            email: 'juan@gmail.com',
            phone: '35123696457',
            subject: 'Reserva de habitación para fecha X',
            description: 'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo'
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })

})
