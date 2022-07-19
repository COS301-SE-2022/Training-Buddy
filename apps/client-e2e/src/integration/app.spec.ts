// import { getGreeting } from '../support/app.po';

import { should } from 'chai';
import * as exp from 'constants';
import { before } from 'cypress/types/lodash';
import { getGreeting } from '../support/app.po';


describe('client', () => {

  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome client');
  });

});
