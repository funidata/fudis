import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	devices: ['mobile'],
	loadWait: 200,
};

const configInit: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '1-init',
};

const configFocus: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '2-focus',
};

const configError: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '3-error',
};

const configSelect: FudisScreenshotTestConfig = {
	...configCommon,
	testName: '4-select',
};

describe('Radio Button Group screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-form-radio-button-group--examples&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configInit);
		cy.get('#fudis-radio-button-group-2-item-2').focus();

		fudisScreenshots(configFocus);
		cy.get('#boolean-1').focus();
		cy.get('#fudis-guidance-2-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		cy.get('#boolean-1').check();
		fudisScreenshots(configError);
		cy.get('#fudis-radio-button-group-2-item-2').focus();
		cy.get('input#fudis-radio-button-group-2-item-2').check();
		fudisScreenshots(configSelect);
	});
});
