import { fudisScreenshots } from './utilities/utility';

describe('Icon screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-icon--all-icons&viewMode=story');
		fudisScreenshots('both', null, 500);
	});
});
