describe('Home page', () => {
  const cardSelector = '[data-cy="card"]'
  const cardTitleSelector = '[data-cy="card-title"]'
  const cardFavoritesButtonSelector = '[data-cy="card-favorites-button"]'
  const cardCopyButtonSelector = '[data-cy="card-copy-button"]'
  const cardCopiedSelector = '[data-cy="card-copied"]'
  const homeLinkSelector = '[href="/"]'
  const favoritesLinkSelector = '[href="/favorites"]'

  describe('Home', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should have at least 1 palette card', () => {
      cy.get(cardSelector)
        .should('have.length.greaterThan', 1)
    })

    it('copy button click should add css code to clipboard', () => {
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

    it('should maintain palettes on route change and back', () => {
      const texts = [];

      cy.get(cardTitleSelector)
        .each(($el) => {
          texts.push($el.val());
        });

      cy.get(favoritesLinkSelector)
        .trigger('click')

      cy.contains('h2', 'My Favorites')

      cy.get(homeLinkSelector)
        .trigger('click')

      cy.contains('h2', 'Discover Palettes')

      cy.get(cardTitleSelector)
        .should('have.length.greaterThan', 1)
        .each(($el, idx) => {
          if ($el.val() !== texts[idx]) {
            throw new Error('Text does not match');
          }
        })
    })

    it('palette click should add it to favorites and replace it with a new one', () => {
      cy.get(cardTitleSelector)
        .first()
        .then(($el) => {
          const text = $el.val()

          cy.get(cardFavoritesButtonSelector)
            .first()
            .trigger('click')

          cy.get(cardTitleSelector)
            .first()
            .should('not.contain', text)

          cy.get(favoritesLinkSelector)
            .trigger('click')

          cy.contains('h2', 'My Favorites')

          cy.get(cardTitleSelector)
            .first()
            .should('have.value', text)
        });
    })
  })

  describe('Favorites', () => {
    beforeEach(() => {
      cy.visit('/')

      cy.get(cardFavoritesButtonSelector)
        .first()
        .trigger('click')

      cy.get(favoritesLinkSelector)
        .trigger('click')

      cy.contains('h2', 'My Favorites')

      cy.get(cardSelector)
        .should('have.length', 1)
    })

    it('on Favorites page palette click should remove it from favorites', () => {
      cy.get(cardFavoritesButtonSelector)
        .first()
        .trigger('click')

      cy.get(cardSelector)
        .should('have.length', 0)
    })

    it('should rename palette', () => {
      cy.get(cardTitleSelector)
        .first()
        .clear()

      cy.get(cardTitleSelector)
        .first()
        .type('Color Name{enter}')

      cy.get(homeLinkSelector)
        .trigger('click')

      cy.contains('h2', 'Discover Palettes')

      cy.get(favoritesLinkSelector)
        .trigger('click')

      cy.contains('h2', 'My Favorites')

      cy.get(cardTitleSelector)
        .first()
        .should('have.value', 'Color Name')
    })
  })
})
