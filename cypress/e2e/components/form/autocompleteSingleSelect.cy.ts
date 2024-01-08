import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../../utilities/utility";

const configCommon: FudisScreenshotTestConfig = {
  loadWait: 200,
  isFullscreenScreenshot: true,
  devices: ["mobile", "tablet"],
};

const configSearch1Init: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-1-init",
};

const configSearch2Focus: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-2-focus",
};

const configSearch3TypeMar: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-3-type-mar",
};

const configSearch4TypeMary: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-4-type-mary",
};

const configSearch5Selected: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-5-selected",
};

const configSearch6Cleared: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "search-6-cleared",
};

const configDropdown1Init: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "dropdown-1-init",
};
const configDropdown2Focus: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "dropdown-2-focus",
};

const configDropdown3TypeNumber1: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "dropdown-3-type-number1",
};

const configDropdown4Selected: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "dropdown-4-selected",
};
const configDisabled1Init: FudisScreenshotTestConfig = {
  ...configCommon,
  isFullscreenScreenshot: false,
  testName: "disabled-1-init",
};
const configDisabled2Focus: FudisScreenshotTestConfig = {
  ...configCommon,
  isFullscreenScreenshot: false,
  testName: "disabled-2-focus",
};

describe("Autocomplete (single-select) screenshot", () => {
  it("should match with previous screenshot, search", () => {
    cy.visit(
      "/iframe.html?args=&id=components-form-autocomplete-single-select--autocomplete-search&viewMode=story",
    );
    fudisScreenshotInit();
    fudisScreenshots(configSearch1Init);
    cy.get("#fudis-autocomplete-1").focus();
    fudisScreenshots(configSearch2Focus);
    cy.get("#fudis-autocomplete-1").type("mar");
    fudisScreenshots(configSearch3TypeMar);
    cy.get("#fudis-autocomplete-1").type("y");
    fudisScreenshots(configSearch4TypeMary);
    cy.get(".fudis-autocomplete__option").click();
    fudisScreenshots(configSearch5Selected);
    cy.get("#fudis-autocomplete-1").clear();
    fudisScreenshots(configSearch6Cleared);
  });

  it("should match with previous screenshot, dropdown", () => {
    cy.visit(
      "/iframe.html?args=&id=components-form-autocomplete-single-select--autocomplete-dropdown&viewMode=story",
    );
    fudisScreenshotInit();
    fudisScreenshots(configDropdown1Init);
    cy.get("#fudis-autocomplete-1").focus();
    fudisScreenshots(configDropdown2Focus);
    cy.get("#fudis-autocomplete-1").type("number 1");
    fudisScreenshots(configDropdown3TypeNumber1);
    cy.get("#fudis-autocomplete-1").type("0");
    cy.get(".fudis-autocomplete__option").click();
    fudisScreenshots(configDropdown4Selected);
  });

  it("should match with previous screenshot, disabled", () => {
    cy.visit(
      "/iframe.html?args=&id=components-form-autocomplete-single-select--disabled&viewMode=story",
    );
    fudisScreenshotInit();
    fudisScreenshots(configDisabled1Init);
    cy.get("#fudis-autocomplete-1").focus();
    fudisScreenshots(configDisabled2Focus);
  });
});
