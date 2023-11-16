import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet', 'desktop'],
};

describe('Section screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-section--example');
		fudisScreenshotInit();
		fudisScreenshots(config);
	});
});
