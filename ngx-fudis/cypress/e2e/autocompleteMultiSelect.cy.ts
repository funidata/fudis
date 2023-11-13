import { fudisScreenshots } from './utilities/utility';

describe('Autocomplete Multi Select screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		fudisScreenshots('both', '1-initial');
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		fudisScreenshots('both', '2-focused', 100);
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		fudisScreenshots('both', '3-selecting', 100);
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.get('#fudis-autocomplete-multi-select-2').trigger('keydown', {
			key: 'Esc',
		});
		fudisScreenshots('both', '4-blurred', 100);
	});
});
