describe('Visuals', () => {
  it('should compare screenshot of the entire page', () => {
    cy.visit('http://localhost:6006/iframe.html?args=&id=components-alert-group--example&viewMode=story')
    cy.compareSnapshot('home-page')
  })
})