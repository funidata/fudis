import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Section screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-section--example');
		fudisScreenshotInit();
		fudisScreenshots();
	});
});
