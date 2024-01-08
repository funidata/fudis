type devices = "desktopLarge" | "desktop" | "mobile" | "tablet";

export interface FudisScreenshotTestConfig {
  // Simulated device types of  desktop 'Macbook 13' and mobile 'iPhone X'
  devices?: devices[];
  // If Storyview has multiple screenshots to be taken, an individual name should be spesified
  testName?: undefined | string;
  // If needed add some wait time before running screenshot of a certain state. Used in e. g. wait after clicking a button to make sure browser has really loaded updated view
  loadWait?: number | undefined;
  // By default takes screenshot only about the cropped area where the view is, but if needed e. g. with modals and dropdowns set to true to disable cropping
  isFullscreenScreenshot?: boolean;
  // Percentage desimal from 0-1 for threshold of accepted error difference between baseline and new test runs
  errorThreshold?: number;
  // If test run fails, how many times should be tried again to have a successful screen shot
  tryLimit?: number;
  // How long to wait before new try on failed screenshot match
  newTryDelay?: number;
}

const defaultConfig: FudisScreenshotTestConfig = {
  devices: ["mobile", "desktop"],
  errorThreshold: 0.002,
  tryLimit: 1,
  newTryDelay: 1000,
  isFullscreenScreenshot: false,
};

export const fudisScreenshotInit = () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);

  /**
   * Recommendation from cypress-image-diff documentation
   */
  cy.get("html, body").invoke("attr", "style", "height: auto; scroll-behavior: auto; ");

  /**
   * Native scrollbar, input caret and text area resize styles differ by test devices, so this tries to hides it
   */
  cy.get("html").invoke("attr", "class", "cypress-hide-unstyled-elements");

  /**
   * Remove padding from Storybook removes
   */
  cy.get("body").invoke("attr", "class", "cypress-storybook-box-reset");

  cy.wrap(
    Cypress.automation("remote:debugger:protocol", {
      command: "Emulation.setDeviceMetricsOverride",
      params: {
        // target DPR here
        deviceScaleFactor: 2,
        // width and height set to 0 remove overrides
        width: 0,
        height: 0,
        // my use case wasn't on mobile
        mobile: false,
      },
    }),
  );
};

const screenshotHelper = (name: string, config: FudisScreenshotTestConfig) => {
  const retryOptions = {
    limit: config.tryLimit, // max number of retries
    delay: config.newTryDelay, // delay before next iteration, ms
  };

  if (config.loadWait) {
    cy.wait(config.loadWait);
  }
  if (config.isFullscreenScreenshot) {
    cy.compareSnapshot(name, config.errorThreshold, retryOptions);
  } else {
    cy.get("#storybook-root").compareSnapshot(name, config.errorThreshold, retryOptions);
  }
};

export const fudisScreenshots = (updatedConfig?: FudisScreenshotTestConfig) => {
  const testConfig: FudisScreenshotTestConfig = { ...defaultConfig, ...updatedConfig };

  const desktopLargeName = testConfig.testName
    ? `/desktop-large-${testConfig.testName}`
    : "/desktop_large";
  const desktopName = testConfig.testName ? `/desktop-${testConfig.testName}` : "/desktop";
  const mobileName = testConfig.testName ? `/mobile-${testConfig.testName}` : "/mobile";
  const tabletName = testConfig.testName ? `/tablet-${testConfig.testName}` : "/tablet";

  if (testConfig.devices?.includes("desktopLarge")) {
    cy.viewport("macbook-16");
    screenshotHelper(desktopLargeName, testConfig);
  }
  if (testConfig.devices?.includes("desktop")) {
    cy.viewport("macbook-13");
    screenshotHelper(desktopName, testConfig);
  }
  if (testConfig.devices?.includes("tablet")) {
    cy.viewport("ipad-2");
    screenshotHelper(tabletName, testConfig);
  }
  if (testConfig.devices?.includes("mobile")) {
    cy.viewport("iphone-x");
    screenshotHelper(mobileName, testConfig);
  }
};
