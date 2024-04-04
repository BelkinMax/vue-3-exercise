describe('Home page', () => {
  const cardSelector = '[data-cy="card"]'
  const cardTitleSelector = '[data-cy="card-title"]'
  const cardFavoritesButtonSelector = '[data-cy="card-favorites-button"]'
  const cardCopyButtonSelector = '[data-cy="card-copy-button"]'
  const cardCopiedSelector = '[data-cy="card-copied"]'
  const favoritesLinkSelector = '[href="/favorites"]'

  beforeEach(() => {
    cy.visit('/')
  })

  it('should have at least 1 palette card', () => {
    cy.get(cardSelector)
      .should('have.length.greaterThan', 1)
  })

  it('palette click should add it to favorites and replace it with a new one', () => {
    cy.get(cardTitleSelector)
      .first()
      .then(($el) => {
        const text = $el.text()

        cy.get(cardFavoritesButtonSelector)
          .first()
          .trigger('click')

        cy.get(cardTitleSelector)
          .first()
          .should('not.contain', text)

        cy.get(favoritesLinkSelector)
          .trigger('click')

        cy.contains(text)
          .should('be.visible')
      });
  })

  it('click on copy button should add css code to clipboard', () => {
    cy.window()
      .then((win) => {
        cy.stub(win.navigator.clipboard, 'writeText').resolves()
      })

    cy.get(cardCopyButtonSelector)
      .first()
      .trigger('click')

    cy.get(cardCopiedSelector)
      .should('be.visible')
  })
})
