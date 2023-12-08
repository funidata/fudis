import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../utilities/utility';

const configRegular: FudisScreenshotTestConfig = {
	devices: ['mobile'],
	testName: 'regular',
};

const configExternal: FudisScreenshotTestConfig = {
	devices: ['mobile'],
	testName: 'external',
};

const configWithTitle: FudisScreenshotTestConfig = {
	devices: ['mobile'],
	testName: 'with-title',
};

describe('Link screenshot', () => {
	it('should match with previous screenshot, regular', () => {
		cy.visit('/iframe.html?args=&id=components-link--link&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configRegular);
	});

	it('should match with previous screenshot, external link', () => {
		cy.visit('/iframe.html?args=&id=components-link--external-link&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configExternal);
	});

	it('should match with previous screenshot, with title', () => {
		cy.visit('/iframe.html?args=&id=components-link--link-with-title&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configWithTitle);
	});
});
