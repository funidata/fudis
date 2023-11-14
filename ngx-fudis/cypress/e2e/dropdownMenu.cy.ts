import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	loadWait: 200,
	isFullscreenScreenshot: true,
};

const desktopConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '1-opened',
};

const desktopConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '2-opened',
};

const desktopConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '3-open-another-menu-while-first-is-open',
};

const mobileConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '1-opened',
};

const mobileConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '2-opened',
};

const mobileConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '3-open-another-menu-while-first-is-open',
};

describe('Dropdown Menu screenshot', () => {
	it('should match with previous screenshot, desktop interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInits();
		cy.get('#fudis-button-1').click();
		fudisScreenshots(desktopConfig1);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots(desktopConfig2);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(desktopConfig3);
	});

	it('should match with previous screenshot, mobile interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInits();
		cy.viewport('iphone-x');
		cy.get('#fudis-button-1').click();
		fudisScreenshots(mobileConfig1);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots(mobileConfig2);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots(mobileConfig3);
	});
});
