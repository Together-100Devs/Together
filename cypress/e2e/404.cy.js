/// <reference types="cypress" />

import tgt from "../support/tgt";

describe("404", () => {
  it("Home links to home, and relevant text exists on the page", () => {
    cy.visit("/blablabla");
    // Assert that the h1 contains the correct text
    cy.get("h1").contains("Oops, looks like you are lost ...");

    tgt.nav.button.home().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
