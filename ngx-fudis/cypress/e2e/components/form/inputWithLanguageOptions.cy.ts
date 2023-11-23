import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	loadWait: 100,
	devices: ['mobile', 'tablet'],
	isFullscreenScreenshot: true,
};

const configAll_1: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-1',
};

const configAll_2: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-2',
};

const configAll_3: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-3',
};

const configAll_4: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-4',
};

const configAll_5: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-5',
};

const configAll_6: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-6',
};

const configAll_7: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-7',
};

const configAll_8: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'all-8',
};

const configOneRequired_1: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-1',
};

const configOneRequired_2: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-2',
};

const configOneRequired_3: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-3',
};

const configOneRequired_4: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-4',
};

const configOneRequired_5: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-5',
};

const configOneRequired_6: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-6',
};

const configOneRequired_7: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'one-required-7',
};

describe('Input With Language Options screenshot', () => {
	it('should match with previous screenshot, all required', () => {
		cy.visit(
			'/iframe.html?args=&id=components-form-input-with-language-options--example-with-all-required&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots(configAll_1);
		cy.get('#unique-input-1').focus();
		cy.get('#unique-input-1_language-dropdown').focus();
		cy.get('#fudis-guidance-2-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		fudisScreenshots(configAll_2);
		cy.get('#unique-input-1').focus();
		cy.get('#unique-input-1').type('Kapteeni Jälkiviisaus');
		cy.get('#unique-input-1_language-dropdown').focus();
		fudisScreenshots(configAll_3);
		cy.get('#unique-input-1_language-dropdown').click();
		cy.get('#unique-input-1_language-dropdown-panel > .fudis-dropdown__option').eq(1).click();
		fudisScreenshots(configAll_4);
		cy.get('#unique-input-1_language-dropdown').focus();
		cy.get('#unique-input-1').type('Kapten Efterklokhet');
		cy.get('#unique-input-1_language-dropdown').focus();
		fudisScreenshots(configAll_5);
		cy.get('#unique-input-1_language-dropdown').click();
		fudisScreenshots(configAll_6);
		cy.get('#unique-input-1_language-dropdown-panel > .fudis-dropdown__option').eq(2).click();
		cy.get('#unique-input-1_language-dropdown').focus();
		cy.get('#unique-input-1').type('Captain Hindsight');
		fudisScreenshots(configAll_7);
		cy.get('#unique-input-1_language-dropdown').focus();
		fudisScreenshots(configAll_8);
	});
	it('should match with previous screenshot, at least one required', () => {
		cy.visit(
			'/iframe.html?args=&id=components-form-input-with-language-options--example-with-atleast-one-required&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots(configOneRequired_1);
		cy.get('#unique-input-1').focus();
		cy.get('#unique-input-1_language-dropdown').focus();
		cy.get('#fudis-guidance-2-errors').invoke('attr', 'class', 'fudis-guidance__errors--visible');
		fudisScreenshots(configOneRequired_2);
		cy.get('#unique-input-1').focus();
		cy.get('#unique-input-1').type('Kapteeni Jälkiviisaus');
		cy.get('#unique-input-1_language-dropdown').focus();
		fudisScreenshots(configOneRequired_3);
		cy.get('#unique-input-1_language-dropdown').click();
		cy.get('#unique-input-1_language-dropdown-panel > .fudis-dropdown__option').eq(2).click();
		cy.get('#unique-input-1').focus();
		cy.get('#unique-input-1').type('Captain Hingsight');
		cy.get('#unique-input-1_language-dropdown').focus();
		cy.get('#unique-input-1_language-dropdown').click();
		fudisScreenshots(configOneRequired_4);
		cy.get('#unique-input-1_language-dropdown-panel > .fudis-dropdown__option').eq(0).click();
		cy.get('#unique-input-1').focus();
		fudisScreenshots(configOneRequired_5);
		cy.get('#unique-input-1').clear();
		cy.get('#unique-input-1_language-dropdown').focus();
		fudisScreenshots(configOneRequired_6);
		cy.get('#unique-input-1_language-dropdown').click();
		cy.get('#unique-input-1_language-dropdown-panel > .fudis-dropdown__option').eq(2).click();
		cy.get('#unique-input-1_language-dropdown').click();
		fudisScreenshots(configOneRequired_7);
	});
});
