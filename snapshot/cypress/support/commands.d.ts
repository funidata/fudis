/// <reference types="cypress" />

type SnapshotOptions = {
  desktop?: boolean;
  mobile?: boolean;
};

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

    /**
     * Run snapshot comparison.
     *
     * Creates snapshot images from current UI state and compares them against baseline images. If
     * baseline does not exist, the new images are saved as baseline.
     *
     * Images are created using desktop and mobile viewports by default. This can be controlled
     * with the `options` object.
     */
    snapshot(options?: SnapshotOptions): void;
  }
}
