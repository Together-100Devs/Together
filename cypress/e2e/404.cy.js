/// <reference types="cypress" />

import tgt from "../support/tgt";

describe("404", () => {
  it("Home links to home", () => {
    cy.visit("/blablabla");
    tgt.nav.button.home().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
