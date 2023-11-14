import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	deviceType: 'mobile',
};

describe('Badge screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-badge--all-variants&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config);
	});
});
