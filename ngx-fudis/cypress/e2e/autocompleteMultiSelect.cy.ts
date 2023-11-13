import { fudisScreenshotInits, fudisScreenshots, FudisScreenshotTestConfig } from './utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	captureArea: 'wholePage',
	loadWait: 200,
};

const desktop_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '1-initial',
};

const desktop_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '2-focused',
};

const desktop_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'desktop',
	testName: '3-selecting',
};

const desktop_config_4: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: '4-blurred',
	deviceType: 'desktop',
};

const mobile_config_1: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '1-initial',
};

const mobile_config_2: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '2-focused',
};

const mobile_config_3: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '3-selecting',
};

const mobile_config_4: FudisScreenshotTestConfig = {
	...commonConfig,
	deviceType: 'mobile',
	testName: '4-blurred',
};

describe('Autocomplete Multi Select screenshot', () => {
	it('should match with previous screenshot on DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(desktop_config_1);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots(desktop_config_2);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots(desktop_config_3);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots(desktop_config_4);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(mobile_config_1);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots(mobile_config_2);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots(mobile_config_3);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots(mobile_config_4);
	});
});
