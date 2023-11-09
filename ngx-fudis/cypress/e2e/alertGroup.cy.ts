describe('Visuals', () => {
	it('should compare screenshot of the entire page', () => {
		cy.visit('/iframe.html?args=&id=components-alert-group--example&viewMode=story');
		cy.wait(1000);
		cy.compareSnapshot('alert-group_desktop');
	});
});
