describe('Connexion à la plateforme', () => {
  it("Accéder à la page de login depuis une autre page", ()=>{
    cy.visit("/users")
    cy.url().should('eq', 'http://localhost:4200/')
  });
    it('Accéder à la page de login directement', () => {
      cy.visit('/login')
      cy.url().should('eq', 'http://localhost:4200/login')
    });
    it("Connexion au site avec identifiants incorrects", ()=>{
      cy.get("[id='username']").type("1")
      cy.get("[id='password']").type("pass")
      cy.get("[id='login']").click()
      cy.url().should('eq', 'http://localhost:4200/login')
      cy.contains("Utilisateur ou mot de passe incorrect")
    })
    it("Connexion au site avec identifiants corrects", ()=>{
      cy.get("[id='password']").type("word")
      cy.get("[id='login']").click()
      cy.url().should('eq', 'http://localhost:4200/home')
    })
  })