describe("template spec", () => {
  it("passes", () => {
    // cy.on("uncaught:exception", (err, runnable) => {
    //   return false;
    // });
    // cy.visit("/?path=/docs/documentation-introduction-introduction--documentation");
    cy.visit("/iframe.html?args=&id=components-form-dropdown--single-select&viewMode=story");
    // cy.contains("Introduction");
    // cy.get("#storybook-docs").should("be.visible");
    cy.get("fudis-dropdown").should("be.visible");
    cy.compareSnapshot("test");
  });
});
