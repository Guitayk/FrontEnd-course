describe('Connexion à la plateforme', () => {
    it('Accéder à la page de login directement', () => {
      cy.visit('https://localhost:4200/login')
    });
    it("Accéder à la page de login depuis une autre page", ()=>{
      cy.visit("https://localhost:4200/users")
    })
  })