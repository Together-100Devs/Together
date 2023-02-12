/// <reference types="cypress" />

import "@cypress/code-coverage/support";
import "./commands";

beforeEach(() => {
  cy.task("clearDatabase");
  cy.visit("/");
});
