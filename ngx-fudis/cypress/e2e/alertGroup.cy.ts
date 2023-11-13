import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Visuals', () => {
	it('should compare screenshot of the entire page', () => {
		cy.visit('/iframe.html?args=&id=components-alert-group--example&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', undefined, undefined, true);
	});
});
