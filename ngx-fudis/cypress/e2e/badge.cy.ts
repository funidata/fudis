import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Badge screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-badge--all-variants&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('mobile');
	});
});
