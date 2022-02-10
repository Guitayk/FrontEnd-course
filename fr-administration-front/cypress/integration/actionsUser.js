describe("Test d'ajout d'un utilisateur", () => {
    before(() => {
        cy.visit('/login')
        cy.get("[id='username']").type("1")
        cy.get("[id='password']").type("password")
        cy.get("[id='login']").click()
        cy.intercept("http://localhost:4200/home").as("homepage")
        cy.wait(1000)
      });
    it("Accéder à la page des utilisateurs", ()=>{
      cy.visit("/users")
      cy.url().should('eq', 'http://localhost:4200/users')
    });

    it("Accéder au formulaire d'ajout d'utilisateur", ()=>{
        cy.get("[id='addUser']").click()
        cy.url().should('eq', "http://localhost:4200/users/create")
        cy.contains("Ajouter un utilisateur")
    })

    it("Ajouter l'utilisateur puis cliquer sur cancel", ()=>{
        cy.get("[id='prenom']").type("Jean-René")
        cy.get("[id='nom']").type("De Montmirail")
        cy.get("[id='age']").type(24)
        cy.get("[id='cancel']").click()
        cy.url().should('eq', "http://localhost:4200/users")
        cy.contains("Jean-René").should('not.exist')
        cy.contains("De Montmiral").should('not.exist')
    })

    it("Ajouter l'utilisateur puis valider", ()=>{
      cy.get("[id='addUser']").click()
      cy.get("[id='prenom']").type("Jean-René")
      cy.get("[id='nom']").type("De Montmirail")
      cy.get("[id='age']").type(24)
      cy.get("[id='add']").click()
      cy.url().should('eq', "http://localhost:4200/users")
      cy.contains("Jean-René")
      cy.contains("De Montmirail")
  })

  it("Test du filtrage", ()=>{
    cy.get("[id='filterPrenom']").type("Jean-Claude")
    cy.contains("Jean-René").should("not.exist")
    cy.get("[id='filterPrenom']").clear().type("Jean-René")
    cy.contains("Jean-René")
    cy.get("[id='filterPrenom']").clear()
    cy.get("[id='filterNom']").type("Roger")
    cy.contains("Jean-René").should("not.exist")
    cy.get("[id='filterNom']").clear().type("De Montmirail")
    cy.contains("Jean-René")
    cy.get("[id='filterNom']").clear()
  })
  it("Test du filtrage insensible à la casse", ()=>{
    cy.get("[id='filterPrenom']").type("JeAn-ClAuDe")
    cy.contains("Jean-René").should("not.exist")
    cy.get("[id='filterPrenom']").clear().type("JeAn-ReNé")
    cy.contains("Jean-René")
    cy.get("[id='filterPrenom']").clear()
    cy.get("[id='filterNom']").type("RoGer")
    cy.contains("Jean-René").should("not.exist")
    cy.get("[id='filterNom']").clear().type("De MoNtMiRaIl")
    cy.contains("Jean-René")
    cy.get("[id='filterNom']").clear()
  })

  it("Supprimer un utilisateur", ()=>{
    cy.contains("De Montmirail").parent().find("[src='https://img.icons8.com/dotty/30/000000/delete-forever.png']").click()
    cy.contains("Jean-René").should('not.exist')
    cy.contains("De Montmiral").should('not.exist')
  })
})