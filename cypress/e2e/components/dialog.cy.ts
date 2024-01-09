import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const commonConfig: FudisScreenshotTestConfig = {
  loadWait: 500,
  isFullscreenScreenshot: true,
};

const desktopConfig1: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "1",
  devices: ["desktop"],
};

const desktopConfig2: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "2",
  devices: ["desktop"],
};

const desktopConfig3: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "3",
  devices: ["desktop"],
};

const desktopConfig4: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "4",
  devices: ["desktop"],
};

const desktopConfig5: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "5",
  devices: ["desktop"],
};

const mobileConfig1: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "1",
  devices: ["mobile"],
};

const mobileConfig2: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "2",
  devices: ["mobile"],
};

const mobileConfig3: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "3",
  devices: ["mobile"],
};

const mobileConfig4: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "4",
  devices: ["mobile"],
};

const mobileConfig5: FudisScreenshotTestConfig = {
  ...commonConfig,
  testName: "5",
  devices: ["mobile"],
};

describe("Dialog screenshot", () => {
  it("should match with previous screenshot on DESKTOP", () => {
    cy.visit("/iframe.html?args=&id=components-dialog--dialog&viewMode=story");
    fudisScreenshotInit();
    cy.get("#fudis-button-1").click();
    fudisScreenshots(desktopConfig1);
    cy.get("#fudis-button-4").click();
    fudisScreenshots(desktopConfig2);
    cy.get("#example-input-power-animal").click();
    cy.get("#example-input-power-animal").type("Gekko");
    cy.get("#fudis-button-4").click();
    fudisScreenshots(desktopConfig3);
    cy.get("#fudis-button-2").click();
    fudisScreenshots(desktopConfig4);
    cy.get("fudis-dialog-content").scrollTo("bottom");
    fudisScreenshots(desktopConfig5);
  });

  it("should match with previous screenshot on MOBILE", () => {
    cy.visit("/iframe.html?args=&id=components-dialog--dialog&viewMode=story");
    fudisScreenshotInit();
    cy.get("#fudis-button-1").click();
    fudisScreenshots(mobileConfig1);
    cy.get("#fudis-button-4").click();
    fudisScreenshots(mobileConfig2);
    cy.get("#example-input-power-animal").click();
    cy.get("#example-input-power-animal").type("Gekko");
    cy.get("#fudis-button-4").click();
    fudisScreenshots(mobileConfig3);
    cy.get("#fudis-button-2").click();
    fudisScreenshots(mobileConfig4);
    cy.get("fudis-dialog-content").scrollTo("bottom");
    fudisScreenshots(mobileConfig5);
  });
});
