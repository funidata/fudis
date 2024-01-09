import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const config: FudisScreenshotTestConfig = {
  devices: ["mobile"],
};

describe("Badge screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=components-badge--all-variants&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(config);
  });
});
