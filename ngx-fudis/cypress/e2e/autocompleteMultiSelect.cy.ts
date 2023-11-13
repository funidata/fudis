import { fudisScreenshotInit, fudisScreenshots } from './utilities/utility';

describe('Autocomplete Multi Select screenshot', () => {
	it('should match with previous screenshot on DESKTOP', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('desktop', '1-initial', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots('desktop', '2-focused', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots('desktop', '3-selecting', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots('desktop', '4-blurred', 200, true);
	});

	it('should match with previous screenshot on MOBILE', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots('mobile', '1-initial', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots('mobile', '2-focused', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots('mobile', '3-selecting', 200, true);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots('mobile', '4-blurred', 200, true);
	});
});
