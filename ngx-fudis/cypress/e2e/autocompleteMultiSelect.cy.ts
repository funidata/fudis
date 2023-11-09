describe('Autocomplete Multi Select screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-autocomplete-multi-select--multiple-multiselects&viewMode=story');
		cy.wait(1000);
		cy.compareSnapshot('1-initial');
		cy.get('#fudis-autocomplete-multi-select-2').focus();
		cy.wait(100);
		cy.compareSnapshot('2-focused');
		cy.get('#fudis-autocomplete-multi-select-2').type('item a 5');
		cy.get('#fudis-dropdown-menu-1-item-6').click();
		cy.get('#fudis-dropdown-menu-1-item-52').click();
		cy.wait(100);
		cy.compareSnapshot('3-selecting');
		cy.wait(100);
		cy.get('#fudis-autocomplete-multi-select-2').focus().trigger('keydown', {
			key: 'Esc',
		});
		cy.wait(100);
		cy.compareSnapshot('4-blurred');
	});
});
