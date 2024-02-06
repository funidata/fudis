describe("alert-group", () => {
  beforeEach(() => {
    cy.visit("/iframe.html?args=&id=components-alert-group--example&viewMode=story");
    cy.requireElement("fudis-alert-group");
  });

  it("default", () => {
    cy.snapshot();
  });
});
