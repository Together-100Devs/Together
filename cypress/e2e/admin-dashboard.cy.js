/// <reference types="cypress" />

import tgt from "../support/tgt";
import {
  createOffsetDate,
  ensureInMiddleOfMonthAndDay,
} from "../support/functions";

describe("Admin Dashboard", () => {
  it("Admin Dashboard displays admin dashboard header", () => {
    cy.visit("/admindashboard");
    cy.get("h1").contains("Admin Dashboard");
  });

  describe("Updates when new events added", () => {
    it("Displays new event on page refresh", () => {
      // Ensure event container exists
      cy.visit("/admindashboard");
      cy.get("#events").should("exist");

      const now = ensureInMiddleOfMonthAndDay();
      const nextMonth = createOffsetDate(now, "Month", 1);

      const test_title = "Test Title";
      const test_description = "Test Description";
      const test_location = "Test Location";
      const test_author = "100_DEVER";

      // Generate test event
      cy.visit("/");
      cy.createOwnEvents(test_author, {
        title: test_title,
        description: test_description,
        location: test_location,
        startAt: nextMonth,
        endAt: new Date(nextMonth.getTime() + 1),
        groupId: null,
      });

      // Close event creation modal
      tgt.modal.close();

      cy.visit("/admindashboard");
      // Ensure test event rendered with correct title
      cy.get("#events")
        .find(".event li:nth-of-type(1)")
        .invoke("text")
        .should("contain", test_title);

      // Ensure test event rendered with correct description
      cy.get("#events")
        .find(".event li:nth-of-type(2)")
        .invoke("text")
        .should("contain", test_description);
    });

    const aliasHeaderEventCount = alias_name => {
      cy.get("h1 .event-count")
        .invoke("text")
        .should("not.contain", "LOADING")
        .then(parseInt)
        .as(alias_name);
    };

    describe("Add event", () => {
      it("Event Counts", () => {
        // Ensure event container exists
        cy.visit("/admindashboard");
        cy.get("#events").should("exist");

        cy.visit("/admindashboard");
        cy.get("h1").should("be.visible");

        // Create alias for initial event count
        aliasHeaderEventCount("initialEventCount");

        // Generate test event
        const now = ensureInMiddleOfMonthAndDay();
        const nextMonth = createOffsetDate(now, "Month", 1);

        cy.visit("/");
        cy.createOwnEvents("100_DEVER", {
          title: "Test Title",
          description: "Test Description",
          location: "Test Location",
          startAt: nextMonth,
          endAt: new Date(nextMonth.getTime() + 1),
          groupId: null,
        });
        tgt.modal.close();

        // Return to admin dashboard
        cy.visit("/admindashboard");

        // TODO: there should be a better way to wait for a React re-render to update the
        // event count, but a manual wait works currently
        cy.wait(100);

        // Create alias for updated event count
        aliasHeaderEventCount("newEventCount");

        cy.get("h1")
          .should("be.visible")
          .should("not.contain", "LOADING")
          .then(function () {
            // Ensure updated event count is 1 greater then initial event count
            expect(this.newEventCount).to.eq(this.initialEventCount + 1);
          });
      });
    });
  });
});
