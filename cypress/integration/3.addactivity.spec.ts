
describe('training-buddy-client-addmanualactivity-feature', () => {
    
    before(() => {
        cy.visit('/addactivity')  
    })

    it('should try to add an empty activity', () => {

        cy.get('#signup').click()
        
    });

    it('should try to add activity only', () => {
        cy.get('#name')
        .should('have.not', '')
        .type('Afternoon Run')

        cy.get('#signup').click()

        cy.get('#name').clear()

    });

    it('should try to add activity date only', () => {

        cy.get('.mat-datepicker-toggle-default-icon').click()

        cy.get('.mat-calendar-next-button').click()

        cy.get(':nth-child(6) > [data-mat-col="3"] > .mat-calendar-body-cell').click()
        
        cy.get('#signup').click()

        cy.get('#date').clear()

    });

    it('should try to add activity distance only', () => {
        
        cy.get('#distance')
          .should('have.not', '')
          .type('10')

        cy.get('#signup').click()

        cy.get('#distance').clear()

    });



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
