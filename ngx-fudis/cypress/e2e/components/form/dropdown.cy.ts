import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	loadWait: 100,
	devices: ['mobile'],
	isFullscreenScreenshot: true,
};

const configSingle1Init: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'single-1-init',
};

const configSingle2Focus: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'single-2-focus',
};

const configSingle3Opened: FudisScreenshotTestConfig = {
	...configCommon,
	loadWait: 200,
	testName: 'single-3-opened',
};

const configSingle4Select: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'single-4-select',
};

const configMulti1Init: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'multi-1-init',
};

const configMulti2Focus: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'multi-2-focus',
};

const configMulti3Opened: FudisScreenshotTestConfig = {
	...configCommon,
	loadWait: 200,
	testName: 'multi-3-opened',
};

const configMulti4SelectFirst: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'multi-4-select-first',
};
const configMulti5SelectSecond: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'multi-5-select-second',
};

const configMulti6DeSelect: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'multi-6-de-select',
};

describe('Dropdown screenshot', () => {
	it('should match with previous screenshot, single select', () => {
		cy.visit('/iframe.html?args=&id=components-form-dropdown--single-select&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configSingle1Init);
		cy.get('.fudis-dropdown__select').focus();
		fudisScreenshots(configSingle2Focus);
		cy.get('.fudis-dropdown__select').click();
		fudisScreenshots(configSingle3Opened);
		cy.get('.fudis-dropdown__option-list > .fudis-dropdown__option').eq(2).click();
		fudisScreenshots(configSingle4Select);
	});

	it('should match with previous screenshot, multi select', () => {
		cy.visit('/iframe.html?args=&id=components-form-dropdown--multi-select&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshotInit();
		fudisScreenshots(configMulti1Init);
		cy.get('.fudis-dropdown__select').focus();
		fudisScreenshots(configMulti2Focus);
		cy.get('.fudis-dropdown__select').click();
		fudisScreenshots(configMulti3Opened);
		cy.get('.fudis-dropdown__option-list > .fudis-dropdown__option').eq(2).click();
		fudisScreenshots(configMulti4SelectFirst);

		cy.get('.fudis-dropdown__option-list > .fudis-dropdown__option').eq(4).click();
		fudisScreenshots(configMulti5SelectSecond);
		cy.get('.fudis-dropdown__option-list > .fudis-dropdown__option').eq(2).click();
		fudisScreenshots(configMulti6DeSelect);
	});
});
