import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Description List screenshot', () => {
	it('should match with previous screenshot, variant regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-data-loop&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', 'regular');
	});
	it('should match with previous screenshot, variant compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-data-loop&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots('both', 'compact');
	});
	it('should match with previous screenshot, DL inside Grid', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-item-inside-grid&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', 'inside-grid');
	});
	it('should match with previous screenshot, sub components regular', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-sub-components&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', 'sub-components-regular');
	});
	it('should match with previous screenshot, sub components compact', () => {
		cy.visit(
			'/iframe.html?args=variant:compact&id=components-description-list--description-list-with-sub-components&viewMode=story'
		);
		fudisScreenshotInit();
		fudisScreenshots('both', 'sub-components-compact');
	});

	it('should match with previous screenshot, with language badges', () => {
		cy.visit('/iframe.html?args=&id=components-description-list--description-list-with-languages&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('both', 'language-badges-1');
		cy.get('#fudis-button-1').click();
		fudisScreenshots('both', 'language-badges-2');
		cy.get('#fudis-button-2').click();
		fudisScreenshots('both', 'language-badges-3');
		cy.get('#fudis-button-3').click();
		fudisScreenshots('both', 'language-badges-4');
	});
});
