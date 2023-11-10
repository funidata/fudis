/* eslint-disable cypress/no-unnecessary-waiting */
describe('Visuals', () => {
	it('should compare screenshot of the entire page', () => {
		cy.visit('/iframe.html?args=&id=components-alert-group--example&viewMode=story');
		cy.wait(1000);
		cy.compareSnapshot('desktop');
		cy.viewport('iphone-x');
		cy.wait(100);
		cy.compareSnapshot('mobile');
	});
});
