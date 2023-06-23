/// <reference types="cypress" />

import {
  createOffsetDate,
  ensureInMiddleOfMonthAndDay,
  getMonthAndYear,
} from "../support/functions";
import tgt from "../support/tgt";

describe("Calendar", () => {
  const setToTenthOfFebruary2023 = () =>
    cy.clock(new Date(2023, 1, 10), ["Date"]);

  describe("To Guests", () => {
    beforeEach(setToTenthOfFebruary2023);

    it("Visible", () => {
      tgt.landing.button.calendar().click();
      tgt.calendar.currentMonthAndYear().contains("February, 2023");
      // The current day - the 10th - should be highlighted differently
      cy.contains("10").parent().should("have.class", "border-teal-light");
    });

    it("Read-only", () => {
      // Clicking the Add Event and + buttons should do nothing
      tgt.landing.button.calendar().click();
      tgt.calendar.button.addEvent().click();
      tgt.modal.get().contains("Unfortunately");
      tgt.modal.close();

      cy.contains("10").parent().find("button").click({ force: true });
      tgt.modal.get().contains("Unfortunately");
    });
  });

  describe("Links open in new tabs", () => {
    for (const [name, buttonText, match] of [
      ["discord", "Join Team", /discord:\/\//],
      ["feedback", "Feedback", /https:\/\/github.com/],
      ["help", "Help", /https:\/\/github.com/],
    ]) {
      it(name, () => {
        cy.visit("/", {
          onBeforeLoad(win) {
            cy.stub(win, "open").as(`open${name}Tab`);
          },
        });
        tgt.landing.button.calendar().click();
        cy.contains("button", buttonText).click();
        cy.get(`@open${name}Tab`).should("have.been.calledWithMatch", match);
      });
    }
  });

  it("Scrolling changes month", () => {
    setToTenthOfFebruary2023();

    tgt.landing.button.calendar().click();
    tgt.calendar.currentMonthAndYear().contains("February, 2023");

    tgt.calendar.button.previousMonth().click();
    tgt.calendar.currentMonthAndYear().contains("January, 2023");

    tgt.calendar.button.nextMonth().click();
    tgt.calendar.currentMonthAndYear().contains("February, 2023");

    cy.get("main").trigger("wheel", { deltaY: -1 });
    tgt.calendar.currentMonthAndYear().contains("January, 2023");
    cy.wait(200);

    cy.get("main").trigger("wheel", { deltaY: 1 });
    tgt.calendar.currentMonthAndYear().contains("February, 2023");
  });

  it("Fast scrolling doesn't change too many months", () => {
    setToTenthOfFebruary2023();

    tgt.landing.button.calendar().click();
    cy.get("main")
      .trigger("wheel", { deltaY: -1 })
      .trigger("wheel", { deltaY: -1 });
    tgt.calendar.currentMonthAndYear().contains("January, 2023");
  });

  it("Shows events only for the correct month", () => {
    const now = ensureInMiddleOfMonthAndDay();
    const nextMonth = createOffsetDate(now, "Month", 1);

    cy.createOwnEvents("100_DEVER", {
      title: "Test Title",
      description: "Test Description",
      location: "Test Location",
      startAt: nextMonth,
      endAt: new Date(nextMonth.getTime() + 1),
      groupId: null,
    });

    const monthAndYear = getMonthAndYear(now);
    const nextMonthAndYear = getMonthAndYear(nextMonth);
    tgt.modal.close();
    tgt.calendar.currentMonthAndYear().contains(monthAndYear);
    cy.contains("Test Title").should("not.exist");

    tgt.calendar.button.nextMonth().click();
    tgt.calendar.currentMonthAndYear().contains(nextMonthAndYear);
    cy.contains("Test Title");

    tgt.calendar.button.previousMonth().click();
    tgt.calendar.currentMonthAndYear().contains(monthAndYear);
    cy.contains("Test Title").should("not.exist");
  });
});
