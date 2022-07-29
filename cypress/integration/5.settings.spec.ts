describe('training-buddy-client-athlete-profile-feature', () => {
    
    before(() => {
        cy.visit('/settings')  
    })

    it('should allow user to navigate to and from settings page', () => {

        cy.get(':nth-child(1) > .mat-card').click()
        cy.get('.mat-toolbar-row > .mat-icon').click()

        cy.get('.container > :nth-child(2) > .mat-card').click()
        cy.get('.mat-toolbar-row > .mat-icon').click()

        cy.get(':nth-child(3) > .mat-card').click()
        cy.get('.mat-toolbar-row > .mat-icon').click()

        cy.get(':nth-child(4) > .mat-card').click()
        cy.get('.mat-toolbar-row > .mat-icon').click()

        cy.get(':nth-child(5) > .mat-card').click()
        cy.get('.mat-toolbar-row > .mat-icon').click()        

    });

    it('should allow user to logout', () => {

        cy.get(':nth-child(6) > .mat-card').click()
        
    });
 
})