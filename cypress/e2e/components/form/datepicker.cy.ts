import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../../utilities/utility";

const configCommon: FudisScreenshotTestConfig = {
  loadWait: 100,
  devices: ["mobile"],
  isFullscreenScreenshot: true,
};

const configPreselected1Init: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "preselected-1-init",
};

const configPreselected2Focus: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "preselected-2-focus",
};

const configPreselected3Opened: FudisScreenshotTestConfig = {
  ...configCommon,
  loadWait: 200,
  testName: "preselected-3-opened",
};

const configPreselected4Focused: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "preselected-4-focused",
};

const configPreselected5Reopen: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "preselected-5-reopen",
};

const configDisabled: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "disabled",
};
const configMinMaxOpened: FudisScreenshotTestConfig = {
  ...configCommon,
  testName: "min-max-opened",
};

describe("Datepicker screenshot", () => {
  it("should match with previous screenshot, preselected", () => {
    cy.visit(
      "/iframe.html?args=&id=components-form-date-datepicker--datepicker-preselected-date&viewMode=story",
    );
    fudisScreenshotInit();
    fudisScreenshots(configPreselected1Init);
    cy.get(".mdc-icon-button").focus();
    fudisScreenshots(configPreselected2Focus);
    cy.get(".mdc-icon-button").click();
    fudisScreenshots(configPreselected3Opened);
    cy.get(".mat-calendar-body button.mat-calendar-body-cell").eq(1).focus();
    fudisScreenshots(configPreselected4Focused);
    cy.focused().click();
    cy.focused().click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    cy.get(".mdc-icon-button").click();
    fudisScreenshots(configPreselected5Reopen);
  });

  it("should match with previous screenshot, disabled", () => {
    cy.visit("/iframe.html?args=&id=components-form-date-datepicker--disabled&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(configDisabled);
  });

  it("should match with previous screenshot, minmax", () => {
    cy.visit(
      "/iframe.html?args=&id=components-form-date-datepicker--with-min-max-validator&viewMode=story",
    );
    fudisScreenshotInit();
    cy.get(".mdc-icon-button").click();
    fudisScreenshots(configMinMaxOpened);
  });
});
