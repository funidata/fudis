import { fudisScreenshots, fudisScreenshotInit } from './utilities/utility';

describe('Dropdown Menu screenshot', () => {
	it('should match with previous screenshot, desktop interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInit();
		cy.get('#fudis-button-1').click();
		fudisScreenshots('desktop', '1-opened', 200, true);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		fudisScreenshots('desktop', '2-opened', 200, true);
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots('desktop', '2-after-click', 200, true);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots('desktop', '3-open-another-menu-while-first-is-open', 200, true);
	});

	it('should match with previous screenshot, mobile interaction', () => {
		cy.visit('/iframe.html?args=&id=components-dropdown-menu--dropdown-menu&viewMode=story');
		fudisScreenshotInit();
		cy.viewport('iphone-x');
		cy.get('#fudis-button-1').click();
		fudisScreenshots('mobile', '1-opened', 200, true);
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		fudisScreenshots('mobile', '2-opened', 200, true);
		cy.get('#fudis-dropdown-menu-1-item-3').click();
		fudisScreenshots('mobile', '2-after-click', 200, true);
		cy.get('#fudis-button-1').click();
		cy.get('#fudis-dropdown-menu-1-item-3').focus();
		cy.get('#fudis-button-2').click();
		fudisScreenshots('mobile', '3-open-another-menu-while-first-is-open', 200, true);
	});
});
