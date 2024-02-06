/// <reference types="./commands" />

Cypress.Commands.add("requireElement", (selector: string) => {
  cy.get(selector).should("be.visible");
});

const defaultSnapshotOptions = {
  mobile: true,
  desktop: true,
};

Cypress.Commands.add("snapshot", (userOptions?: SnapshotOptions) => {
  const options: SnapshotOptions = { ...defaultSnapshotOptions, ...userOptions };
  const { title } = Cypress.currentTest;

  if (options.desktop) {
    cy.viewport("macbook-16");
    cy.compareSnapshot(`${title}-desktop`);
  }

  if (options.mobile) {
    /**
     * Small caveat: Some UI elements appear slightly differently depending on whether
     * cy.viewport() is called before or after calling cy.visit() and interacting with
     * the UI. However, wrapping test code and running it again for each different
     * viewport size adds some complexity that feels perhaps unnecessary. Therefore I
     * decided to leave it like this for the time being.
     *
     * Occasional problems with this can be handled by duplicating the test code and
     * running this command for desktop and mobile separately. If this becomes too
     * common, this command should be rewritten to wrap around test code.
     */
    cy.viewport("iphone-x");
    cy.compareSnapshot(`${title}-mobile`);
  }
});
