/// <reference types="cypress" />

import { getMonthAndYear } from "../support/functions";
import tgt from "../support/tgt";

describe("Discord OAuth works", () => {
  it("100Dever is allowed in & back", () => {
    cy.login("100_DEVER", true);
    tgt.auth.button.login().should("not.exist");
    tgt.landing.button.calendar().click();
    tgt.calendar.currentMonthAndYear().contains(getMonthAndYear());

    tgt.auth.button.logout().click();
    cy.login("100_DEVER");

    tgt.auth.button.login().should("not.exist");
    tgt.landing.button.calendar().click();
    tgt.calendar.currentMonthAndYear().contains(getMonthAndYear());
  });

  describe("Welcome Model", () => {
    it("Is shown until dismissed", () => {
      cy.login("100_DEVER");
      tgt.modal.get().contains("Hello, 100Dever#0001");

      cy.reload();
      tgt.modal.get().contains("Hello, 100Dever#0001");
    });

    for (const backdrop of [false, true]) {
      it(`Dismissible via ${backdrop ? "backdrop" : "close button"}`, () => {
        cy.login("100_DEVER");
        tgt.modal.get().contains("Hello, 100Dever#0001");
        tgt.modal.close(backdrop);

        cy.reload();
        tgt.modal.get().should("not.exist");
      });
    }
  });

  for (const button of ["Login with Discord", "Log In"]) {
    it(`"${button}" button works`, () => cy.login("100_DEVER", false, button));
  }

  it(`Calendar "Login" button works`, () => {
    tgt.landing.button.calendar().click();
    cy.login("100_DEVER", false, "Login");
  });

  it("Rejection for outsiders", () => {
    cy.login("JOHN_DOE");
    tgt.modal.get().contains("only 100Devs users are allowed");
    tgt.modal.close();
    tgt.auth.button.login().should("exist");
  });

  it("Logout from Calendar", () => {
    cy.login("100_DEVER", true);
    tgt.auth.button.logout().click();
    tgt.auth.button.login().should("exist");
  });

  it("Log Out from Landing", () => {
    cy.login("100_DEVER", true);
    tgt.nav.button.home().click();
    tgt.auth.button.logout("Logout").click();
    tgt.auth.button.login().should("exist");
  });

  it("Logout from Landing", () => {
    cy.login("100_DEVER", true);
    tgt.nav.button.home().click();
    tgt.auth.button.logout("Log Out").click();
    tgt.auth.button.login().should("exist");
  });
});
