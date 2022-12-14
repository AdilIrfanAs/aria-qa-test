describe("Application Testing", () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get("#sign-in-email").click().type("admin@admin.com").invoke('val')
    .then(val => {
      const inputValue = val;
      if (inputValue !== "admin@admin.com") {
        throw new Error('You entered wrong Email')
      }
    });
    cy.get('#sign-in-password').click().type("admin").invoke('val')
    .then(val => {
      const inputValue = val;
      if (inputValue !== "admin") {
        throw new Error('You entered wrong password')
      }
    });;
    cy.get("#sign-in-email").should('have.value', 'admin@admin.com');
    cy.get('#sign-in-password').should('have.value', 'admin');
    cy.get('#login').click()
    cy.login("admin@admin.com", 'admin')

  })

  it("create issue", function () { 
    cy.visit('http://localhost:3000/issue/new')
    cy.get('#issue-name').type("is").invoke('val')
    .then(val => {
      const inputValue = val;
      if (inputValue.length <5) {
        throw new Error('name must be longer than or equal to 5 characters')
      }
    });

    cy.get('#issue-description').type("Issue Description")
    cy.get('#score-input').type("15")
    cy.get('#issue-date').type("2022-12-14")
    cy.get('#create-button').click()
    cy.visit('http://localhost:3000/issue')
  })

  it('list issues', function () {
    cy.visit('http://localhost:3000/issue')
  })

  it('list statistics', function () {
    cy.visit('http://localhost:3000/')
  })

  it.only('logout', function () {
    cy.visit('http://localhost:3000/')
    cy.get('#logout').click()
  })
})






