import { fudisScreenshotInit, fudisScreenshots, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	isFullscreenScreenshot: true,
	loadWait: 200,
};

const desktopConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '1-initial',
};

const desktopConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '2-focused',
};

const desktopConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['desktop'],
	testName: '3-selecting',
};

const desktopConfig4: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '4-blurred',
	devices: ['desktop'],
};

const mobileConfig1: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '1-initial',
};

const mobileConfig2: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '2-focused',
};

const mobileConfig3: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '3-selecting',
};

const mobileConfig4: FudisScreenshotTestConfig = {
	...commonConfig,
	devices: ['mobile'],
	testName: '4-blurred',
};

describe('Autocomplete Multi Select screenshot', () => {
	it('should match with previous screenshot on DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(desktopConfig1);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots(desktopConfig2);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots(desktopConfig3);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots(desktopConfig4);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(mobileConfig1);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots(mobileConfig2);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots(mobileConfig3);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots(mobileConfig4);
	});
});
