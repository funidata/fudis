import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const config: FudisScreenshotTestConfig = {
  devices: ["mobile", "tablet", "desktop", "desktopLarge"],
};

describe("Footer screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=components-footer--footer&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(config);
  });
});
