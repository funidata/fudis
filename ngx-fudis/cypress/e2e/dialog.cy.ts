import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	loadWait: 500,
	isFullscreenScreenshot: true,
};

const desktopConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '1',
	devices: ['desktop'],
};

const desktopConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '2',
	devices: ['desktop'],
};

const desktopConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '3',
	devices: ['desktop'],
};

const mobileConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '1',
	devices: ['mobile'],
};

const mobileConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '2',
	devices: ['mobile'],
};

const mobileConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '3',
	devices: ['mobile'],
};

describe('Dialog screenshot', () => {
	it('should match with previous screenshot om DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(desktopConfig1);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(desktopConfig2);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots(desktopConfig3);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(mobileConfig1);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(mobileConfig2);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots(mobileConfig3);
	});
});
