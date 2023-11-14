import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	devices: ['desktop', 'mobile'],
	isFullscreenScreenshot: true,
};

describe('Visuals', () => {
	it('should compare screenshot of the entire page', () => {
		cy.visit('/iframe.html?args=&id=components-alert-group--example&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config);
	});
});
