
describe('training-buddy-client-athlete-profile-feature', () => {
    
    before(() => {
        cy.visit('/profile')  
    })

    it('should allow user to navigate to and from profile', () => {

        cy.get(':nth-child(2) > .link').click()

        cy.get(':nth-child(1) > .link').click()

        cy.get('#configurelink > .ng-tns-c163-0').click()

        cy.get('[ng-reflect-router-link="/profile"]').click()

        cy.get('.rightcontent > .mat-icon').click()

        cy.get('.mat-toolbar-row > .mat-icon').click()
        
    });

})
