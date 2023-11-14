import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	loadWait: 500,
	captureArea: 'wholePage',
};

const desktop_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '1',
	deviceType: 'desktop',
};

const desktop_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '2',
	deviceType: 'desktop',
};

const desktop_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '3',
	deviceType: 'desktop',
};

const mobile_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '1',
	deviceType: 'mobile',
};

const mobile_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '2',
	deviceType: 'mobile',
};

const mobile_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '3',
	deviceType: 'mobile',
};

describe('Dialog screenshot', () => {
	it('should match with previous screenshot om DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(desktop_config_1);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(desktop_config_2);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots(desktop_config_3);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(mobile_config_1);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(mobile_config_2);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots(mobile_config_3);
	});
});
