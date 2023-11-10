import { fudisScreenshots } from './utilities/utility';

describe('Expadanble screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-expandable--all-variants&viewMode=story');
		fudisScreenshots('both', '1-all-closed');
		cy.get('#fudis-expandable-1-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots('both', '2-regular-opened');
		cy.get('#fudis-expandable-1-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots('both', '3-regular-closed');
		cy.get('#fudis-expandable-4-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots('both', '4-lite-open');
	});
});
