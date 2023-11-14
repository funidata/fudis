import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config_regular: FudisScreenshotTestConfig = {
	deviceType: 'mobile',
	testName: 'regular',
};

const config_external: FudisScreenshotTestConfig = {
	deviceType: 'mobile',
	testName: 'external',
};

const config_with_title: FudisScreenshotTestConfig = {
	deviceType: 'mobile',
	testName: 'with-title',
};

describe('Link screenshot', () => {
	it('should match with previous screenshot, regular', () => {
		cy.visit('/iframe.html?args=&id=components-link--link&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_regular);
	});

	it('should match with previous screenshot, external link', () => {
		cy.visit('/iframe.html?args=&id=components-link--external-link&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_external);
	});

	it('should match with previous screenshot, with title', () => {
		cy.visit('/iframe.html?args=&id=components-link--link-with-title&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_with_title);
	});
});
