/// <reference types="cypress" />

import tgt from "../support/tgt";

// Generate test event
const TEST_EVENT_AUTHOR = "100_DEVER";
const TEST_EVENTS = [
  {
    title: "1st EVENT",
    description: "1st Description",
    location: "1st Location",
    groupId: "admin_text_event_id",
    startAt: Date.now(),
    endAt: Date.now() + 3600,
  },
  {
    title: "2nd EVENT",
    description: "2nd Description",
    location: "2nd Location",
    groupId: "admin_text_event_id",
    startAt: Date.now(),
    endAt: Date.now() + 3600,
  },
];

const addTestEvents = (test_events = TEST_EVENTS) => {
  cy.url().then(return_url => {
    cy.visit("/");

    // Generate test events
    cy.createOwnEvents(TEST_EVENT_AUTHOR, ...test_events);

    // Close event creation modal
    tgt.modal.close();

    // Return to original URL
    cy.visit(return_url);
  });
};

describe("Admin Dashboard", () => {
  const aliasHeaderEventCount = alias_name => {
    cy.get("h1 .event-count")
      .invoke("text")
      .should("not.contain", "LOADING")
      .then(parseInt)
      .as(alias_name);
  };

  it("Admin Dashboard displays admin dashboard header", () => {
    cy.visit("/admindashboard");
    cy.get("h1").contains("Admin Dashboard");
  });

  describe("Page updates when events change", () => {
    describe("Add Events", () => {
      before(() => {
        // Navigate to admin dashboard
        cy.visit("/admindashboard");
        cy.get("#events").should("exist");

        // Create alias for initial event count
        aliasHeaderEventCount("initialEventCount");
      });
      beforeEach(() => {
        // Navigate to admin dashboard
        cy.visit("/admindashboard");

        // Add test events
        addTestEvents(TEST_EVENTS);
      });

      it("Event titles and descriptions", () => {
        TEST_EVENTS.forEach((test_event, i) => {
          // Ensure test events rendered with correct title
          cy.get("#events")
            .find(`.event:nth-of-type(${i + 1}) li:nth-of-type(1)`)
            .invoke("text")
            .should("contain", test_event.title);

          // Ensure test event rendered with correct description
          cy.get("#events")
            .find(`.event:nth-of-type(${i + 1}) li:nth-of-type(2)`)
            .invoke("text")
            .should("contain", test_event.description);
        });
      });

      it("Event Counts", () => {
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
            expect(this.newEventCount).to.eq(
              this.initialEventCount + TEST_EVENTS.length
            );
          });
      });
    });
  });
});
