import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet'],
	loadWait: 100,
};

const configInit: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '1-init',
};

const configFocus: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '2-focus',
};

const configType1: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '3-type-1',
};

const configType2: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '4-type-2',
};

describe('Text Area screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-form-text-area--examples&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configInit);
		cy.get('#fudis-text-area-1').focus();
		fudisScreenshots(configFocus);
		cy.get('#fudis-text-area-2').focus();
		cy.get('#fudis-guidance-1-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		cy.get('#fudis-text-area-2').type('Hello second');
		fudisScreenshots(configType1);
		cy.get('#fudis-text-area-1').focus();
		cy.get('#fudis-text-area-1').type('Hello first');
		fudisScreenshots(configType2);
	});
});
