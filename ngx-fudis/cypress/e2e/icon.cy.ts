import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	loadWait: 500,
	errorThreshold: 0.004,
};

describe('Icon screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-icon--all-icons&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config);
	});
});
