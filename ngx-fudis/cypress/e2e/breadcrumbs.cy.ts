import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from './utilities/utility';

const config: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet'],
};

describe('Breadcrumbs screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-breadcrumbs--breadcrumbs&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config);
	});
});
