import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const config: FudisScreenshotTestConfig = {
  devices: ["mobile"],
  isFullscreenScreenshot: true,
  loadWait: 200,
};

describe("Tooltip screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=directives-tooltip--example&viewMode=story");
    fudisScreenshotInit();
    cy.get("#fudis-button-1").focus();
    cy.get(".mat-mdc-tooltip").invoke("attr", "style", "transform: none; ");
    fudisScreenshots(config);
  });
});
