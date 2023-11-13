import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	loadWait: 500,
	threshold: 0.004,
};

describe('Icon screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-icon--all-icons&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config);
	});
});
