/// <reference types="cypress" />

import tgt from "./tgt";

Cypress.Commands.add(
  "login",
  (userCode, closeModal = false, loginButtonText = "Login with Discord") => {
    cy.intercept(
      {
        method: "GET",
        url: "https://discord.com/oauth2/authorize*",
        times: 1,
      },
      req =>
        req.redirect(
          Cypress.config().baseUrl + "/auth/discord/callback?code=" + userCode
        )
    ).as("discordAuthorize");
    cy.contains("button", loginButtonText).click();
    cy.wait("@discordAuthorize");
    if (closeModal) tgt.modal.close();
  }
);

Cypress.Commands.add("createOwnEvents", (userCode, ...events) => {
  cy.login(userCode);
  cy.request("GET", "/getDisplayName").then(({ body }) => {
    for (const event of events) {
      cy.task("createEvent", {
        ...event,
        user: body._id,
      });
    }
  });
  cy.reload();
});

Cypress.Commands.add("deleteOwnGroupEvents", (userCode, groupId) => {
  if (groupId) {
    cy.request("DELETE", `/events/deleteAllEvents/${groupId}`);
  }

  cy.reload();
});

Cypress.Commands.add("deleteOwnEvent", id => {
  if (id) {
    cy.request("DELETE", `/events/${id}`);
  }
});

Cypress.Commands.add("getAllEvents", userCode => {
  // cy.login(userCode)
  return cy.request("GET", "/events");
});
