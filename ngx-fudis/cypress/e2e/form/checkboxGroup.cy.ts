import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from '../utilities/utility';

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

const configNormal3Blur: FudisScreenshotTestConfig = {
	...configCommon,
	loadWait: 200,
	testName: 'normal-3-blur',
};

const configNormal4Select: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'normal-4-select',
};

describe('Checkbox Group screenshot', () => {
	it('should match with previous screenshot, normal', () => {
		cy.visit('/iframe.html?args=&id=components-form-checkbox-group--example&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configNormal1Init);
		cy.get('#fudis-checkbox-group-1-item-3').focus();
		fudisScreenshots(configNormal2Focus);
		cy.get('body').click();
		cy.get('#fudis-guidance-1-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		fudisScreenshots(configNormal3Blur);
		cy.get('#fudis-checkbox-group-1-item-3-label').click();
		fudisScreenshots(configNormal4Select);
	});
});
