import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../utilities/utility';

const commonConfig: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet'],
};

const config1: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'regular',
};

const config2: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'compact',
};

const config3: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'inside-grid',
};

const config4: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'sub-components-regular',
};

const config5: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'sub-components-compact',
};

const config6: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'language-badges-1',
};

const config7: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'language-badges-2',
};

const config8: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'language-badges-3',
};

const config9: FudisScreenshotTestConfig = {
	...commonConfig,
	testName: 'language-badges-4',
};

describe('Description List screenshot', () => {
	it('should match with previous screenshot, variant regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-data-loop&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config1);
	});
	it('should match with previous screenshot, variant compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-data-loop&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots(config2);
	});
	it('should match with previous screenshot, DL inside Grid', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-item-inside-grid&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config3);
	});
	it('should match with previous screenshot, sub components regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-sub-components&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config4);
	});
	it('should match with previous screenshot, sub components compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-with-sub-components&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots(config5);
	});

	it('should match with previous screenshot, with language badges', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-languages&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config6);
		cy.get('#fudis-button-1').click();
		fudisScreenshots(config7);
		cy.get('#fudis-button-2').click();
		fudisScreenshots(config8);
		cy.get('#fudis-button-3').click();
		fudisScreenshots(config9);
	});
});
