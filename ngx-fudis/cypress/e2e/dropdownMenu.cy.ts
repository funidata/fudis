import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	loadWait: 200,
	isFullscreenScreenshot: true,
};

const desktop_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '1-opened',
};

const desktop_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '2-opened',
};

const desktop_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '3-open-another-menu-while-first-is-open',
};

const mobile_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '1-opened',
};

const mobile_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '2-opened',
};

const mobile_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '3-open-another-menu-while-first-is-open',
};

describe('Dropdown Menu screenshot', () => {
	it('should match with previous screenshot, desktop interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(desktop_config_1);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots(desktop_config_2);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(desktop_config_3);
	});

	it('should match with previous screenshot, mobile interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInits();
		cy.viewport('iphone-x');
		cy.get('#fudis-button-1').click();
		fudisScreenshots(mobile_config_1);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots(mobile_config_2);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(mobile_config_3);
	});
});
