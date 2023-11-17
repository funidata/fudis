import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	loadWait: 100,
	devices: ['mobile'],
	isFullscreenScreenshot: true,
};

const configNormal1Init: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'normal-1-init',
};

const configNormal2Focus: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'normal-2-focus',
};

const configNormal3Opened: FudisScreenshotTestConfig = {
	...configCommon,
	loadWait: 200,
	testName: 'normal-3-opened',
};

const configNormal4Select: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'normal-4-select',
};

const configNormal5Reopen: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'normal-5-reopen',
};

const configDisabled: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'disabled',
};
const configMinMaxOpened: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'min-max-opened',
};

describe('Datepicker screenshot', () => {
	it('should match with previous screenshot, normal', () => {
		cy.visit('/iframe.html?id=components-form-date-datepicker--datepicker&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configNormal1Init);
		cy.get('.mdc-icon-button').focus();
		fudisScreenshots(configNormal2Focus);
		cy.get('.mdc-icon-button').click();
		fudisScreenshots(configNormal3Opened);
		cy.focused().click();
		fudisScreenshots(configNormal4Select);
		cy.get('.mdc-icon-button').click();
		fudisScreenshots(configNormal5Reopen);
	});

	it('should match with previous screenshot, disabled', () => {
		cy.visit('/iframe.html?args=&id=components-form-date-datepicker--disabled&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configDisabled);
	});

	it('should match with previous screenshot, minmax', () => {
		cy.visit('/iframe.html?args=&id=components-form-date-datepicker--with-min-max-validator&viewMode=story');
		fudisScreenshotInit();
		cy.get('.mdc-icon-button').click();
		fudisScreenshots(configMinMaxOpened);
	});
});
