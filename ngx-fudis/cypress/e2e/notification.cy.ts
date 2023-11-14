import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config_all: FudisScreenshotTestConfig = {
	testName: 'all-variants',
};

const config_link: FudisScreenshotTestConfig = {
	testName: 'with-link',
};

describe('Notification screenshot', () => {
	it('should match with previous screenshot, all variants', () => {
		cy.visit('/iframe.html?args=&id=components-notification--all-variants&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_all);
	});

	it('should match with previous screenshot, with link', () => {
		cy.visit('/iframe.html?args=&id=components-notification--link-notification&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_link);
	});
});
