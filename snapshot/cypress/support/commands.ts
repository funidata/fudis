/// <reference types="./commands" />

Cypress.Commands.add("requireElement", (selector: string) => {
  return cy.get(selector).should("be.visible");
});
