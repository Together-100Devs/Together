/// <reference types="cypress" />

import tgt from "../support/tgt";

describe("Landing", () => {
  it("Home links to home", () => {
    cy.visit("/");
    tgt.nav.button.home().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("GitHub link exists", () => {
    cy.contains('a[href^="https://github.com"]', "GitHub");
  });

  it("Calendar links to calendar", () => {
    cy.visit("/");
    tgt.nav.button.calendar().click();
    cy.url().should("eq", Cypress.config().baseUrl + "/calendar");
  });

  it("Admin Dashboard displays admin dashboard", () => {
    cy.visit("/admindashboard");
    cy.get("h1").contains("You have made it to admin dashboard");
  });

  it("Hamburger Menu", () => {
    cy.viewport("iphone-6");
    tgt.nav.hamburger.toggle().click();
    tgt.nav.hamburger.menu().contains("CALENDAR").should("be.visible");
    tgt.nav.hamburger.toggle().click();
    tgt.nav.hamburger.menu().contains("CALENDAR").should("not.be.visible");
  });
});
