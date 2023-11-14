import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const configBasic: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet', 'desktop'],
	testName: 'basic',
};

const configAlignX: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet', 'desktop'],
	testName: 'align-X',
};

const configAlignY: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet'],
	testName: 'align-Y',
};

const configAlignXAndY: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet'],
	testName: 'align-X-and-Y',
};

const configColumns: FudisScreenshotTestConfig = {
	testName: 'columns',
};

const configResponsiveColumns: FudisScreenshotTestConfig = {
	devices: ['mobile', 'desktop', 'tablet'],
	testName: 'responsive-columns',
};

describe('Grid screenshot', () => {
	it('should match with previous screenshot, basic', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--example&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configBasic);
	});

	it('should match with previous screenshot, align X', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--align-x&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configAlignX);
	});

	it('should match with previous screenshot, align X', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--align-y&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configAlignY);
	});

	it('should match with previous screenshot, align X', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--align-x-and-y&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configAlignXAndY);
	});

	it('should match with previous screenshot, align X', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--columns&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configColumns);
	});

	it('should match with previous screenshot, align X', () => {
		cy.visit('/iframe.html?args=&id=components-grid-grid-item--responsive-columns&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(configResponsiveColumns);
	});
});
