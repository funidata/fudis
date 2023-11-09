describe('Button screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-button--all-variants&viewMode=story');
		cy.wait(1000);
		cy.compareSnapshot('1');
	});
});
