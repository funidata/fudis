import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from './utilities/utility';

const configAll: FudisScreenshotTestConfig = {
	testName: 'all-variants',
};

const configLink: FudisScreenshotTestConfig = {
	testName: 'with-link',
};

describe('Notification screenshot', () => {
	it('should match with previous screenshot, all variants', () => {
		cy.visit('/iframe.html?args=&id=components-notification--all-variants&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configAll);
	});

	it('should match with previous screenshot, with link', () => {
		cy.visit('/iframe.html?args=&id=components-notification--link-notification&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configLink);
	});
});
