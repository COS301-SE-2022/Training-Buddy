describe('training-buddy-client-editprofile-feature', () => {

    before(() => {
        cy.visit('/editprofile') 
    })

    it('should try to save an unedited profile', () => {

        cy.get('#save').click()
    });

    // it.only('should allow user to upload image', () => {
    //     const imagePath = 'buddy.jpg'
    //     cy.get('.mat-button-wrapper > .mat-icon')
    // });

    it('should try to edit user name and surname only', () => {
   
        cy.get('#userNameSurname').clear()
          .should('have.not','')
          .type('Lehlohonolo Sehako')
        
        cy.get('#save').click()

        cy.get('#userNameSurname').clear()

    });

    it('should try to edit user email only', () => {

        cy.get('#userEmail')
          .should('have.not', '')
          .type('tester@gmail.com')

        cy.get('#save').click()

    });

    it('should try to edit user gender only', () => {
        
        cy.get('.mat-select-arrow').click()
        cy.get('#mat-option-0 > .mat-option-text').click()

        cy.get('#save').click()

        cy.get('.mat-select-arrow').click()
        cy.get('#mat-option-1 > .mat-option-text').click()

        cy.get('#save').click()


    });

    it('should try to edit user location only', () => {
        
        cy.get('#userEmail').clear()

        cy.get('#mat-input-3').click()
          .should('have.not', '')
          .type('Hatfield Pretoria')
        
        cy.get('#save').click()

    });

    it('should allow user to edit profile successfully', () => {

        cy.reload()

        cy.get('#userNameSurname').clear()
          .should('have.not','')
          .type('Lehlohonolo Sehako')

        cy.get('#userEmail')
          .should('have.not', '')
          .type('u1@gmail.com')

        cy.get('#userCellNumber').clear()
          .should('have.not','')
          .type('0812345698')
        
        cy.get('.mat-select-arrow').click()
        cy.get('#mat-option-0 > .mat-option-text').click()

        cy.get('#userEmail').clear()

        cy.get('#mat-input-3').click()
          .should('have.not', '')
          .type('Hatfield Pretoria')
        
        cy.get('#save').click()

    });


    
});