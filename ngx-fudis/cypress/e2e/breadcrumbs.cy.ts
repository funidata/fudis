import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Breadcrumbs screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-breadcrumbs--breadcrumbs&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots();
	});
});
