import {
  fudisScreenshots,
  fudisScreenshotInit,
  FudisScreenshotTestConfig,
} from "../../utilities/utility";

const config1: FudisScreenshotTestConfig = {
  devices: ["mobile"],
  testName: "step-1",
};
const config2: FudisScreenshotTestConfig = {
  devices: ["tablet"],
  testName: "step-2",
};
const config3: FudisScreenshotTestConfig = {
  devices: ["desktop"],
  testName: "step-3",
};
const config4: FudisScreenshotTestConfig = {
  devices: ["tablet"],
  testName: "step-4",
};
const config5: FudisScreenshotTestConfig = {
  devices: ["mobile"],
  testName: "step-5",
};
const config6: FudisScreenshotTestConfig = {
  devices: ["tablet"],
  testName: "step-6",
};
const config7: FudisScreenshotTestConfig = {
  devices: ["desktop"],
  testName: "step-7",
};

describe("Spacing screenshot", () => {
  it("should match with previous screenshot", () => {
    cy.visit("/iframe.html?args=&id=directives-spacing--responsive-example&viewMode=story");
    fudisScreenshotInit();
    fudisScreenshots(config1);
    fudisScreenshots(config2);
    fudisScreenshots(config3);
    fudisScreenshots(config4);
    fudisScreenshots(config5);
    fudisScreenshots(config6);
    fudisScreenshots(config7);
  });
});
