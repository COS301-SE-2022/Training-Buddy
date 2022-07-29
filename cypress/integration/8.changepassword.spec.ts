describe('training-buddy-client-changepassword-feature', () => {
    before(() => {
        cy.visit('/changepassword') 
    })

    it('should try to save empty form', () => {
        cy.get('#changepassword').click()
    })

    it('should show old and new password when unseeing', () => {
        cy.get('#old')
          .should('have.not','')
          .type('oldPassword')

        cy.get('.mat-form-field-should-float > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon')
          .click()
          .click()
          

        cy.get('#one')
          .should('have.not','')
          .type('newPassword')

          cy.get('.mat-form-field-invalid > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-suffix > .mat-focus-indicator > .mat-button-wrapper > .mat-icon')
          .click()
          .click()
          
        cy.get('#one').clear()
        cy.get('#old').clear()

    })

    it('should allow user to change password successfully', () => {
        
        cy.get('#old')
          .should('have.not', '')
          .type('oldPassword')

        cy.get('#one')
          .should('have.not','')
          .type('newPassword123*')

        cy.get('#two')
          .should('have.not','')
          .type('newPassword123*')
        
          cy.get('#changepassword').click()
        
    });

    it('should navigate to login', () => {

      cy.reload()

      cy.get('.mat-toolbar-row > .mat-icon').click()
    })

    it('should navigate to login', () => {
      cy.visit('/settings')

      cy.get(':nth-child(6) > .mat-card').click()


    })
})