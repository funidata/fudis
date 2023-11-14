export interface FudisScreenshotTestConfig {
	deviceType?: 'both' | 'desktop' | 'mobile';
	testName?: undefined | string;
	loadWait?: number | undefined;
	captureArea?: undefined | 'wholePage';
	threshold?: number;
	tryLimit?: number;
	newTryDelay?: number;
}

const defaultConfig: FudisScreenshotTestConfig = {
	deviceType: 'both',
	threshold: 0,
	tryLimit: 3,
	newTryDelay: 500,
};

export const fudisScreenshotInits = () => {
	cy.get('html, body').invoke('attr', 'style', 'height: auto; scroll-behavior: auto; ');

	cy.get('html').invoke('attr', 'class', 'hidden-scrollbar');

	// document.querySelector('html')!.classList.add('hidden-scrollbar');

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

	const desktopName = testConfig.testName ? `${testConfig.testName}_desktop` : 'desktop';
	const mobileName = testConfig.testName ? `${testConfig.testName}_mobile` : 'mobile';

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
		if (testConfig.captureArea) {
			cy.compareSnapshot(desktopName, testConfig.threshold, retryOptions);
		} else {
			cy.get('#storybook-root').compareSnapshot(desktopName, testConfig.threshold, retryOptions);
		}
	}
	if (testConfig.deviceType === 'both' || testConfig.deviceType === 'mobile') {
		cy.viewport('iphone-x');
		if (testConfig.loadWait) {
			cy.wait(testConfig.loadWait);
		}
		if (testConfig.captureArea) {
			cy.compareSnapshot(mobileName, testConfig.threshold, retryOptions);
		} else {
			cy.get('#storybook-root').compareSnapshot(mobileName, testConfig.threshold, retryOptions);
		}
	}
};
