import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../../utilities/utility";

const configCommon: FudisScreenshotTestConfig = {
  devices: ["mobile", "desktop", "tablet", "desktopLarge"],
  loadWait: 200,
  isFullscreenScreenshot: true,
};

const configInit: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "1-init",
};

const configInstantSubmit: FudisScreenshotTestConfig = {
  ...configCommon,
  loadWait: 500,
  testName: "2-instant-submit",
};

const configChangeLanguage: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "3-change-language",
};

const configFillFirst: FudisScreenshotTestConfig = {
  ...configCommon,
  loadWait: 500,
  testName: "4-fill-first-input",
};

const configSubmitAfterFirstFill: FudisScreenshotTestConfig = {
  ...configCommon,
  loadWait: 500,
  testName: "5-submit-after-first-fill",
};

const configSubmitAfterSecondFill: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "6-fill-second-input",
};

describe("Form screenshot", () => {
  it("should match with previous screenshot, instant Submit and change language", () => {
    cy.visit("/iframe.html?args=&id=components-form-form--example&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(configInit);
    cy.get("#fudis-button-4").click();
    fudisScreenshots(configInstantSubmit);
    cy.get("#fudis-button-3").click();
    fudisScreenshots(configChangeLanguage);
  });

  it("should match with previous screenshot, after filling some part and submit and fixing error", () => {
    cy.visit("/iframe.html?args=&id=components-form-form--example&viewMode=story");
    fudisScreenshotInit();

    cy.get("#fudis-expandable-1-header-button").click();
    cy.get("#unique-input-3").focus();
    cy.get("#unique-input-3").type("Teacher McTeachyface");
    cy.get("#unique-input-4").focus();
    cy.get("#date-picker-1").focus();
    cy.get("#date-picker-1").type("11.38.1977");
    cy.get("#fudis-checkbox-group-1-item-2").focus();
    cy.get("#fudis-daterange-1-start-date").focus();
    cy.get("#fudis-button-4").focus();
    fudisScreenshots(configFillFirst);
    cy.get("#fudis-button-4").click();
    fudisScreenshots(configSubmitAfterFirstFill);
    cy.get("#unique-input-1").focus();
    cy.get("#unique-input-1").type("Basics of Sword Fight Insults");
    cy.get("#fudis-button-4").click();
    fudisScreenshots(configSubmitAfterSecondFill);
  });
});
