export interface FudisScreenshotTestConfig {
	// Simulated device types of  desktop 'Macbook 13' and mobile 'iPhone X'
	deviceType?: 'both' | 'desktop' | 'mobile';
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
	deviceType: 'both',
	errorThreshold: 0,
	tryLimit: 3,
	newTryDelay: 500,
	isFullscreenScreenshot: false,
};

export const fudisScreenshotInits = () => {
	cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto; ');

	cy.get('html').invoke('attr', 'class', 'hidden-scrollbar');

	cy.wrap(
		Cypress.automation('remote:debugger:protocol', {
			command: 'Emulation.setDeviceMetricsOverride',
			params: {
				// target DPR here
				deviceScaleFactor: 1,
				// width and height set to 0 remove overrides
				width: 0,
				height: 0,
				// my use case wasn't on mobile
				mobile: false,
			},
		})
	);
};

export const fudisScreenshots = (updatedConfig?: FudisScreenshotTestConfig) => {
	const testConfig: FudisScreenshotTestConfig = { ...defaultConfig, ...updatedConfig };

	const desktopName = testConfig.testName ? `/${testConfig.testName}_desktop` : '/desktop';
	const mobileName = testConfig.testName ? `/${testConfig.testName}_mobile` : '/mobile';

	const retryOptions = {
		limit: testConfig.tryLimit, // max number of retries
		delay: testConfig.newTryDelay, // delay before next iteration, ms
	};

	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(1000);

	if (testConfig.deviceType === 'both' || testConfig.deviceType === 'desktop') {
		cy.viewport('macbook-13');
		if (testConfig.loadWait) {
			cy.wait(testConfig.loadWait);
		}
		if (testConfig.isFullscreenScreenshot) {
			cy.compareSnapshot(desktopName, testConfig.errorThreshold, retryOptions);
		} else {
			cy.get('#storybook-root').compareSnapshot(desktopName, testConfig.errorThreshold, retryOptions);
		}
	}
	if (testConfig.deviceType === 'both' || testConfig.deviceType === 'mobile') {
		cy.viewport('iphone-x');
		if (testConfig.loadWait) {
			cy.wait(testConfig.loadWait);
		}
		if (testConfig.isFullscreenScreenshot) {
			cy.compareSnapshot(mobileName, testConfig.errorThreshold, retryOptions);
		} else {
			cy.get('#storybook-root').compareSnapshot(mobileName, testConfig.errorThreshold, retryOptions);
		}
	}
};
