import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../../utilities/utility';

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

describe('Text Input screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-form-text-input--examples&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configInit);
		cy.get('#fudis-text-input-3').focus();
		fudisScreenshots(configFocus);
		cy.get('#fudis-text-input-3').type('hey!');
		cy.get('#fudis-guidance-3-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		cy.get('#fudis-text-input-4').focus();
		cy.get('#fudis-text-input-4').type("MANNY! you couldn't find a sale AT A YACHT CLUB!!!");
		cy.get('#fudis-guidance-4-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		fudisScreenshots(configType1);
		cy.get('#fudis-text-input-3').focus();
		cy.get('#fudis-text-input-3').clear();
		cy.get('#fudis-text-input-3').type('hey@hi.com');
		fudisScreenshots(configType2);
	});
});
