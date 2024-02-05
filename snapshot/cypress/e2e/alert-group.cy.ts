describe("alert-group", () => {
  beforeEach(() => {
    cy.visit("/iframe.html?args=&id=components-alert-group--example&viewMode=story");
    cy.get("fudis-alert-group").should("be.visible");
  });

  // TODO: Create custom function for setting viewport and naming screenshots.

  it("desktop", () => {
    cy.compareSnapshot("desktop");
  });

  it("mobile", () => {
    cy.viewport("iphone-x");
    cy.compareSnapshot("mobile");
  });
});
