import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Icon screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-icon--all-icons&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', null, 500);
	});
});
