/// <reference types="cypress" />

const modal = {
  ANIMATION_DELAY: Cypress.env("CYPRESS_NO_DELAYS") ? 0 : 1000,
  /**
   * @param {number} delay Delay while waiting for animation, none if 0
   */
  get(delay = this.ANIMATION_DELAY) {
    if (delay) cy.wait(this.ANIMATION_DELAY);
    return cy.get(".modal");
  },
  /**
   * @param {boolean} backdrop If to close by clicking the backdrop
   * @param {number} delay Delay while waiting for animation, none if 0
   */
  close(backdrop, delay = this.ANIMATION_DELAY) {
    if (backdrop) this.get().parent().click("right");
    else this.get().contains("button", "Close").click();

    if (delay) cy.wait(delay);
  },
};

export default {
  modal,
  auth: {
    button: {
      logout: text => cy.contains("button", text ?? /Logout|Log Out/),
      login: text => cy.contains("button", text ?? /Login with Discord|Log In/),
    },
  },
  calendar: {
    button: {
      addEvent: () => cy.contains("button", "Add Event"),
      previousMonth() {
        return cy
          .get("header > section")
          .eq(1)
          .find("button")
          .eq(0)
          .as("previousMonthButton");
      },
      nextMonth() {
        return cy
          .get("header > section")
          .eq(1)
          .find("button")
          .eq(1)
          .as("nextMonthButton");
      },
    },
    currentMonthAndYear() {
      return cy
        .get("header > section")
        .eq(1)
        .find("h2")
        .as("currentMonthAndYear");
    },
  },
  landing: {
    button: {
      calendar: () => cy.contains("button", "Calendar"),
    },
  },
  createForm: {
    get: modal.get.bind(modal),
    close: modal.close.bind(modal, true),
    button: {
      back: () => modal.get(0).contains("button", "Back"),
      next: () => modal.get(0).contains("button", "Next"),
      submit: () => modal.get(0).contains("button", "Submit"),
    },
    alerts: () => modal.get(0).get(".alert"),
    input: {
      title: () => modal.get(0).get('input[name="title"]'),
      description: () => modal.get(0).get('textarea[name="description"]'),
      location: () => modal.get(0).get('input[name="location"]'),
      startDate: () => modal.get(0).get('input[name="initialDate"]'),
      startTime: () => modal.get(0).get('input[name="startTime"]'),
      endDate: () => modal.get(0).get('input[name="finalDate"]'),
      endTime: () => modal.get(0).get('input[name="endTime"]'),
      noRecurring: () => modal.get(0).get('input[name="noRecurr"]'),
      weekly: () => modal.get(0).get('input[name="weekly"]'),
    },
  },
  nav: {
    button: {
      home: () => cy.contains("button", "Home"),
      calendar: () => cy.contains("button", "Calendar"),
    },
    hamburger: {
      toggle: () => cy.get("nav > div > div").eq(1),
      menu: () => cy.get("nav ul"),
    },
  },
};
