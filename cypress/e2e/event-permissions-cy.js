/// <reference types="cypress" />

import {
  createOffsetDate,
  ensureInMiddleOfMonthAndDay,
} from "../support/functions";
import tgt from "../support/tgt";

describe("Event Permissions", () => {
  beforeEach(() => {
    cy.task("clearDb");

    const now = ensureInMiddleOfMonthAndDay();
    const tomorrow = createOffsetDate(now, "Date", 1);
    const tomorrowAndAnHour = createOffsetDate(tomorrow, "Hours", 1);

    //   create test event
    cy.login("100_DEVER");
    cy.createOwnEvents("100_DEVER", {
      title: "Test Event",
      description: "Test Description",
      location: "Test Location",
      startAt: tomorrow,
      endAt: tomorrowAndAnHour,
      groupId: null,
    });
  });

  it("allows moderators to delete any event", () => {
    cy.login("MODERATOR_USER");
    tgt.landing.button.calendar().click();
    cy.contains("button", "Test Event").click();
    cy.contains("button", "Delete Specific Event").click();

    cy.contains("Test Event").should("not.exist");
  });

  it("prevents regular users from deleting other users' events", () => {
    cy.login("SECOND_100_DEVER");
    tgt.landing.button.calendar().click();
    cy.contains("button", "Test Event").click();
    cy.contains("button", "Delete Specific Event").should("not.exist");
  });
});
