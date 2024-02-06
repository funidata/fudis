/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Wait for given element to be visible.
     *
     * Use this before taking a snapshot. Usually, you should pass the top-level HTML tag as `selector`.
     *
     * @example cy.requireElement("fudis-alert-group");
     */
    requireElement(selector: string): void;
  }
}
