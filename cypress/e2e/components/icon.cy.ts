import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const config: FudisScreenshotTestConfig = {
  devices: ["mobile", "tablet"],
  loadWait: 500,
};

describe("Icon screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=components-icon--all-icons&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(config);
  });
});
