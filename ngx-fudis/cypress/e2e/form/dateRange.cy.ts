import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../utilities/utility';

const configDateRange: FudisScreenshotTestConfig = {
	loadWait: 100,
	devices: ['mobile'],
	testName: 'init',
};

describe('Daterange screenshot', () => {
	it('should match with previous screenshot, regular', () => {
		cy.visit('/iframe.html?args=&id=components-form-date-date-range--date-range&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configDateRange);
	});
});
