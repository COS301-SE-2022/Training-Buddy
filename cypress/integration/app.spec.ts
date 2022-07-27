
describe('training-buddy-client-login-feature', () => {
    it('successfully loads login page', () => {

      cy.visit('/login') 
      cy.get('#userEmail').type('u1@gmail.com')
      cy.get('#userPassword').type('Test123*')
      cy.get('#login').click()

    })

})

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


describe('training-buddy-client-addmanualactivity-feature', () => {
    
    before(() => {
        cy.visit('/addactivity')  
    })

    it('should allow user to add a new activity', () => {
        
        cy.get('.mat-form-field.ng-tns-c90-0 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('Morning Run')
        cy.get('.mat-form-field-type-mat-select > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.get('#mat-option-1 > .mat-option-text').click()
        
        cy.get('#hours').clear()
        cy.get('#hours').type('2')

        cy.get('#minutes').clear()
        cy.get('#minutes').type('59')

        cy.get('#seconds').clear()
        cy.get('#seconds').type('59')

        cy.get('.mat-datepicker-toggle-default-icon').click()

        cy.get('.mat-calendar-next-button').click()

        cy.get(':nth-child(6) > [data-mat-col="3"] > .mat-calendar-body-cell').click()

        cy.get('#distance').type('10')

        cy.get('#signup').click()

    })

})
