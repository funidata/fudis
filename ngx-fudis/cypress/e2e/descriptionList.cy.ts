import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config_1: FudisScreenshotTestConfig = {
	testName: 'regular',
};

const config_2: FudisScreenshotTestConfig = {
	testName: 'compact',
};

const config_3: FudisScreenshotTestConfig = {
	testName: 'inside-grid',
};

const config_4: FudisScreenshotTestConfig = {
	testName: 'sub-components-regular',
};

const config_5: FudisScreenshotTestConfig = {
	testName: 'sub-components-compact',
};

const config_6: FudisScreenshotTestConfig = {
	testName: 'language-badges-1',
};

const config_7: FudisScreenshotTestConfig = {
	testName: 'language-badges-2',
};

const config_8: FudisScreenshotTestConfig = {
	testName: 'language-badges-3',
};

const config_9: FudisScreenshotTestConfig = {
	testName: 'language-badges-4',
};

describe('Description List screenshot', () => {
	it('should match with previous screenshot, variant regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-data-loop&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_1);
	});
	it('should match with previous screenshot, variant compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-data-loop&viewMode=story'
		);
		fudisScreenshotInits();
		fudisScreenshots(config_2);
	});
	it('should match with previous screenshot, DL inside Grid', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-item-inside-grid&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_3);
	});
	it('should match with previous screenshot, sub components regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-sub-components&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_4);
	});
	it('should match with previous screenshot, sub components compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-with-sub-components&viewMode=story'
		);
		fudisScreenshotInits();
		fudisScreenshots(config_5);
	});

	it('should match with previous screenshot, with language badges', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-languages&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_6);
		cy.get('#fudis-button-1').click();
		fudisScreenshots(config_7);
		cy.get('#fudis-button-2').click();
		fudisScreenshots(config_8);
		cy.get('#fudis-button-3').click();
		fudisScreenshots(config_9);
	});
});
