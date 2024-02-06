describe("autocomplete-multi-select", () => {
  beforeEach(() => {
    cy.visit(
      "/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story",
    );
    cy.requireElement("fudis-autocomplete-multi-select");
  });

  it("default", () => {
    cy.snapshot();
  });

  it("focused", () => {
    cy.get("#fudis-autocomplete-multi-select-2").focus();
    cy.snapshot();
  });

  it("options selected", () => {
    cy.get("#fudis-autocomplete-multi-select-2").focus();
    cy.get("#fudis-autocomplete-multi-select-2").type("item a 5");
    cy.get("#fudis-autocomplete-multi-select-2-dropdown").children().eq(1).click();
    cy.get("#fudis-autocomplete-multi-select-2-dropdown").children().eq(3).click();

    cy.snapshot();
  });

  it("blurred", () => {
    cy.get("#fudis-autocomplete-multi-select-2").focus();
    cy.get("#fudis-autocomplete-multi-select-2-dropdown").children().eq(1).click();
    cy.get("#fudis-autocomplete-multi-select-2-dropdown").children().eq(3).click();
    cy.get("#fudis-autocomplete-multi-select-2").trigger("keydown", {
      key: "Esc",
    });

    cy.snapshot();
  });
});
