describe('training-buddy-client-dashboard-feature', () => {

    before(() => {
        cy.visit('/dashboard')
    })

    it('should allow a user to filter by running', () =>{

        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-1 > .mat-option-text').click()

    })

    it('should allow user to filter by riding', () => {

        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-2 > .mat-option-text').click()

    })

    
    it('should allow user to filter by swimming', () => {
        
        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-3 > .mat-option-text').click()

    })

    it('should allow user to filter by weight lifing', () => {
        
        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-4 > .mat-option-text').click()

    })

    it('should allow user to filter by none', () => {
        
        cy.get('.mat-form-field-infix').click()
        cy.get('#mat-option-0 > .mat-option-text').click()

    })
})