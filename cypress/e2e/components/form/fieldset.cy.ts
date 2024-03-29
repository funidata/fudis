import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../../utilities/utility";

const config: FudisScreenshotTestConfig = {
  devices: ["tablet", "desktop"],
  isFullscreenScreenshot: true,
};

describe("Fieldset screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=components-form-field-set--example&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(config);
  });
});
