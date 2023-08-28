/// <reference types="cypress" />

import tgt from "../support/tgt";

const TEST_EVENT_AUTHOR = "100_DEVER";
const TEST_EVENT_GROUP_ID = "admin_text_event_id";

// Generate singular test events
const SINGULAR_TEST_EVENTS = [
  {
    title: "1st SINGULAR EVENT",
    description: "1st Singular Description",
    location: "1st Location",
    groupId: null,
    startAt: Date.now(),
    endAt: Date.now() + 60 * 60,
  },
  {
    title: "2nd SINGULAR EVENT",
    description: "2nd Singular Description",
    location: "2nd Location",
    groupId: null,
    startAt: Date.now() + 60 * 60,
    endAt: Date.now() + 60 * 60 * 2,
  },
];

// Generate group (recurring) test events
const GROUP_TEST_EVENTS = [
  {
    title: "1st GROUP EVENT",
    description: "1st Group Description",
    location: "1st Location",
    groupId: TEST_EVENT_GROUP_ID,
    startAt: Date.now(),
    endAt: Date.now() + 60 * 60,
  },
  {
    title: "1st GROUP EVENT",
    description: "1st Group Description",
    location: "1st Location",
    groupId: TEST_EVENT_GROUP_ID,
    startAt: Date.now() + 60 * 60 * 24,
    endAt: Date.now() + 60 * 60 * 24 + 3600,
  },
];

// Calculate group event counts (how many times a group event recurs)
// indexed by its groupId property
const GROUP_EVENT_COUNTS_BY_GROUP_ID = GROUP_TEST_EVENTS.reduce(
  (acc, event) => {
    acc[event.groupId] = acc[event.groupId] || 0;
    return { [event.groupId]: acc[event.groupId] + 1, ...acc };
  },
  {}
);

// Utility function to add test events consistently before each test
const addTestEvents = test_events => {
  cy.url().then(return_url => {
    // Generate test events
    cy.visit("/");
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
    describe("Add events", () => {
      before(() => {
        // Navigate to admin dashboard
        cy.visit("/admindashboard");
        cy.get("#events").should("exist");

        // Create alias for initial event count
        aliasHeaderEventCount("initialEventCount");
      });
      beforeEach(() => {
        // Add test events
        addTestEvents([...SINGULAR_TEST_EVENTS, ...GROUP_TEST_EVENTS]);

        // Navigate to admin dashboard
        cy.visit("/admindashboard");
      });

      it("Single event titles and descriptions", () => {
        SINGULAR_TEST_EVENTS.forEach((test_event, i) => {
          // Ensure test events rendered with correct title
          cy.get("#events")
            .find(`.single-event:nth-of-type(${i + 1}) li:nth-of-type(1)`)
            .invoke("text")
            .should("contain", test_event.title);

          // Ensure test event rendered with correct description
          cy.get("#events")
            .find(`.single-event:nth-of-type(${i + 1}) li:nth-of-type(2)`)
            .invoke("text")
            .should("contain", test_event.description);
        });
      });

      it("Group event titles and descriptions", () => {
        GROUP_TEST_EVENTS.forEach((test_event, i) => {
          // Ensure test events rendered with correct title and description
          cy.get("#events")
            .find(`.group-event`)
            .invoke("text")
            .should("contain", test_event.title)
            .should("contain", test_event.description);
        });
      });

      it("Total event counts", () => {
        // TODO: there should be a better way to wait for a React re-render to update the
        // event counts, but a manual wait works currently. This applies to other similar
        // manual waits in other admin dashboard tests.
        cy.wait(100);

        // Create alias for updated event count
        aliasHeaderEventCount("newEventCount");

        cy.get("h1")
          .should("be.visible")
          .should("not.contain", "LOADING")
          .then(function () {
            // Ensure updated event count is 1 greater then initial event count
            expect(this.newEventCount).to.eq(
              this.initialEventCount +
                SINGULAR_TEST_EVENTS.length +
                Object.entries(GROUP_EVENT_COUNTS_BY_GROUP_ID).length
            );
          });
      });
    });

    describe("Delete Events", () => {
      before(() => {});
      beforeEach(() => {
        // Add test events
        addTestEvents([...SINGULAR_TEST_EVENTS, ...GROUP_TEST_EVENTS]);

        // Reload page and navigate to admin dashboard
        cy.visit("/admindashboard");
        cy.wait(100);

        // Create alias for initial event count
        aliasHeaderEventCount("initialEventCount");
      });

      it("Delete singular events", () => {
        // Delete all singular events by id
        cy.getAllEvents().then(({ body }) => {
          body.forEach(event => {
            if (!event.groupId) {
              cy.deleteOwnEvent(event._id);
            }
          });
        });

        cy.visit("/admindashboard");
        cy.wait(100);

        // Create alias for updated event count
        aliasHeaderEventCount("newEventCount");

        cy.get("h1")
          .should("be.visible")
          .should("not.contain", "LOADING")
          .then(function () {
            // Ensure updated event count matches initial count minus deleted events
            expect(this.newEventCount).to.eq(
              this.initialEventCount - SINGULAR_TEST_EVENTS.length
            );
          });
      });

      it("Delete group events", () => {
        // Delete all group events
        cy.deleteOwnGroupEvents(TEST_EVENT_AUTHOR, TEST_EVENT_GROUP_ID);

        cy.visit("/admindashboard");
        cy.wait(100);

        // Create alias for updated event count
        aliasHeaderEventCount("newEventCount");

        cy.get("h1")
          .should("be.visible")
          .should("not.contain", "LOADING")
          .then(function () {
            // Ensure updated event count matches initial count minus deleted events
            expect(this.newEventCount).to.eq(
              this.initialEventCount -
                Object.entries(GROUP_EVENT_COUNTS_BY_GROUP_ID).length
            );
          });
      });

      it("Event titles and descriptions no longer exist", () => {
        // Delete all singular events by id
        cy.getAllEvents().then(({ body }) => {
          body.forEach(event => {
            if (!event.groupId) {
              cy.deleteOwnEvent(event._id);
            }
          });
        });

        // Delete all group events
        cy.deleteOwnGroupEvents(TEST_EVENT_AUTHOR, TEST_EVENT_GROUP_ID);

        cy.wait(100);

        // Ensure single events are no longer displayed
        cy.get("#single-events .single-event").should("not.exist");

        // Ensure group events are no longer displayed
        cy.get("#group-events .group-event").should("not.exist");
      });
    });
  });
});
