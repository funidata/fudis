import { fudisScreenshots } from './utilities/utility';

describe('Dialog screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-dialog--dialog&viewMode=story');
		cy.get('#fudis-button-1').click();
		fudisScreenshots('both', '1', 500);
		cy.get('#fudis-dialog-1-close').click();
		cy.get('#fudis-button-2').click();
		fudisScreenshots('both', '2', 500);
		cy.get('fudis-dialog-content').scrollTo('bottom');
		fudisScreenshots('both', '3', 500);
	});
});
