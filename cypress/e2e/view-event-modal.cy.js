/// <reference types="cypress" />

import { createOffsetDate, getHoursAndMinutes } from "../support/functions";
import tgt from "../support/tgt";

describe("View Event Modal", () => {
  describe("Events can be viewed", () => {
    for (const by of ["100Dever", "Guest"]) {
      (by === "Guest" ? it.skip : it)("By " + by, () => {
        const now = new Date();
        const tomorrow = createOffsetDate(now, "Date", 1);
        const tomorrowAndAnHour = createOffsetDate(tomorrow, "Hours", 1);
        const overmorrow = createOffsetDate(tomorrow, "Date", 1);
        const overmorrowAndAnHour = createOffsetDate(overmorrow, "Hours", 1);

        cy.task("generateObjectId").then(groupId =>
          cy.createOwnEvents(
            "100_DEVER",
            ...[
              {
                startAt: tomorrow,
                endAt: tomorrowAndAnHour,
              },
              {
                startAt: overmorrow,
                endAt: overmorrowAndAnHour,
              },
            ].map(info => ({
              ...info,
              title: "Test Title",
              description: "Test Description",
              location: "Test Location",
              groupId,
            }))
          )
        );
        tgt.modal.close();
        if (by === "Guest") {
          tgt.auth.button.logout().click();
          tgt.landing.button.calendar().click();
        }

        const dates = [
          [tomorrow, tomorrowAndAnHour],
          [overmorrow, overmorrowAndAnHour],
        ];

        const eventModalShown = (canSeeDeleteButtons, starts, ends) => {
          tgt.modal.get().should("be.visible");

          tgt.modal
            .get(0)
            .contains("button", "Delete All Events")
            .should(canSeeDeleteButtons ? "exist" : "not.exist");
          tgt.modal
            .get(0)
            .contains("button", "Delete Specific Event")
            .should(canSeeDeleteButtons ? "exist" : "not.exist");

          tgt.modal.get(0).contains("Test Title");
          tgt.modal.get(0).contains("Description: Test Description");
          tgt.modal.get(0).contains(".dateTime", getHoursAndMinutes(starts));
          tgt.modal.get(0).contains(".dateTime", getHoursAndMinutes(ends));
          tgt.modal
            .get(0)
            .contains(
              "Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone
            );
          tgt.modal.get(0).contains("Location: Test Location");
          tgt.modal
            .get(0)
            .contains("Event Author: 100Dever#0001")
            .should(by ? "exist" : "not.exist");
        };

        cy.contains("button", "Test Title").each(($el, i) => {
          const [starts, ends] = dates[i];
          cy.wrap($el).click();
          eventModalShown(by === "100Dever", starts, ends);

          tgt.modal.close(!!i);
          tgt.modal.get().should("not.exist");
        });

        if (by === "Guest") return;

        tgt.auth.button.logout().click();
        cy.login("SECOND_100_DEVER", true);
        cy.contains("button", "Test Title").first().click();
        eventModalShown(false, tomorrow, tomorrowAndAnHour);
      });
    }
  });

  it("Can delete own events", () => {
    const now = new Date();
    const tomorrow = createOffsetDate(now, "Date", 1);
    const tomorrowAndAnHour = createOffsetDate(tomorrow, "Hours", 1);
    const overmorrow = createOffsetDate(tomorrow, "Date", 1);
    const overmorrowAndAnHour = createOffsetDate(overmorrow, "Hours", 1);
    const overovermorrow = createOffsetDate(overmorrow, "Date", 1);
    const overovermorrowAndAnHour = createOffsetDate(
      overovermorrow,
      "Hours",
      1
    );

    cy.task("generateObjectId").then(groupId =>
      cy.createOwnEvents(
        "100_DEVER",
        ...[
          {
            title: "Test Recurring Title #1",
            startAt: tomorrow,
            endAt: tomorrowAndAnHour,
            groupId,
          },
          {
            title: "Test Recurring Title #2",
            startAt: overmorrow,
            endAt: overmorrowAndAnHour,
            groupId,
          },
          {
            title: "Test Recurring Title #3",
            startAt: overovermorrow,
            endAt: overovermorrowAndAnHour,
            groupId,
          },
          {
            title: "Test Single Title #1",
            startAt: tomorrow,
            endAt: tomorrowAndAnHour,
            groupId: null,
          },
          {
            title: "Test Single Title #2",
            startAt: tomorrow,
            endAt: tomorrowAndAnHour,
            groupId: null,
          },
        ].map(info => ({
          ...info,
          description: "Test Description",
          location: "Test Location",
        }))
      )
    );
    cy.contains("button", "Close").click();

    cy.log("Deleting just Recurring #1");
    cy.contains("button", "Test Recurring Title #1").first().click();
    cy.contains("button", "Delete Specific Event").click();
    tgt.modal.get().should("not.exist");
    cy.get("Test Recurring Title #1").should("not.exist");
    cy.contains("button", "Test Recurring Title #2").should("exist");
    cy.contains("button", "Test Recurring Title #3").should("exist");
    cy.contains("button", "Test Single Title #1").should("exist");
    cy.contains("button", "Test Single Title #2").should("exist");

    cy.log("Deleting all recurring #2");
    cy.contains("button", "Test Recurring Title #3").first().click();
    cy.contains("button", "Delete All Events").click();
    tgt.modal.get().should("not.exist");
    cy.get("Test Recurring Title #2").should("not.exist");
    cy.get("Test Recurring Title #3").should("not.exist");
    cy.contains("button", "Test Single Title #1").should("exist");
  });
});
