describe.only('training-buddy-client-athlete-profile-feature', () => {

    it('should try to save without updates', () => {

        cy.get('#signup').click()
        
    });

    it('should add one activity only', () => {
        
        cy.get('#mat-checkbox-3 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()

        cy.get('#signup').click()

    });

    it('should add user bio only', () => {

        cy.get('#mat-input-0').type('I love running and riding, but would also like to get into swimming and weight lifting I am also a student @ Tuks')

        cy.get('#signup').click()
        
    });


    it('should add all activites', () => {
        
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()

        cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()

        cy.get('#mat-checkbox-3 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()

        cy.get('#mat-checkbox-4 > .mat-checkbox-layout > .mat-checkbox-inner-container').click()


        cy.get('.mat-slider-thumb')
        .type("{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}");

        cy.get('#mat-input-0').type('I love running and riding, but would also like to get into swimming and weight lifting I am also a student @ Tuks')

        cy.get('#signup').click()

        cy.get('.mat-toolbar-row > .mat-icon').click()

    });
    

});