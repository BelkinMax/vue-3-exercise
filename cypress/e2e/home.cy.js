describe('Home page', () => {
  it('visits the app home url', () => {
    cy.visit('/')
    cy.contains('h1', 'Palette Picker')
  })
})
