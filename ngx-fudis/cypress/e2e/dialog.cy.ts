import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Dialog screenshot', () => {
	it('should match with previous screenshot om DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInit();
		cy.get('#fudis-button-1').click();
		fudisScreenshots('desktop', '1', 500, true);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots('desktop', '2', 500, true);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots('desktop', '3', 500, true);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		fudisScreenshotInit();
		cy.get('#fudis-button-1').click();
		fudisScreenshots('mobile', '1', 500, true);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots('mobile', '2', 500, true);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots('mobile', '3', 500, true);
	});
});
