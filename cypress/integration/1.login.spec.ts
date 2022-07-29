describe('training-buddy-client-login-feature', () => {

  
    before(() =>{
        
        cy.visit('/login') 
    })

    it('should try to login in user with email only', () => {

        cy.get('#userEmail')
          .should('have.value', '')
          .type('u1@gmail.com')

        cy.get('#login')
        .click()

    });

    it('should try to login in user with password only', () => {
        
        cy.get('#userEmail').clear()

        cy.get('#userPassword')
        .should('have.value', '')
        .type('Test123*')
       
        cy.get('#login')
          .click()

    })

    it('should try to login user without login details', () => {

        cy.get('#userPassword').clear()

        cy.get('#login')
        .click()
    })

    it('should allow user to go to signup page', () => {

      cy.get('.signUpLink').click()

      cy.get('.logInLink').click()

    });

    it('should allow user to view password', () => {

      cy.get('#userPassword')
      .should('have.value', '')
      .type('TestViewPassword')
      
      cy.get('.mat-form-field-suffix > .mat-focus-indicator')
        .click()
        .click()

        cy.get('#userPassword').clear() 

    });



    it('should successfully allow user to login', () => {

        cy.get('#userEmail')
          .should('have.value', '')
          .type('u1@gmail.com')

        cy.get('#userPassword')
          .should('have.value', '')
          .type('Test123*')
          .blur()
         
          cy.get('#login')
            .click()

    })

})



