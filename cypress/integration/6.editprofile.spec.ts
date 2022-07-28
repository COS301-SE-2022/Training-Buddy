describe('training-buddy-client-editprofile-feature', () => {

    before(() => {
        
        cy.visit('/editprofile') 
  
    })

    it('should try to save an unedited profile', () => {

        cy.get('#save').click()
    });

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

    // it.only('should try to edit user gender only', () => {
        

    // });


    
});