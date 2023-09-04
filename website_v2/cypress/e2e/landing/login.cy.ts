describe("Test Login Functionality", () => {
  it("Signin with static user data in Cypress ENV", () => {
    cy.visit("/");
    cy.getCypress("linkedin-button").should("be.visible");
    cy.getCypress("linkedin-button").click();
    cy.getCypress("explore-link").should("be.visible");
    cy.getCypress("explore-link").click();
    cy.wait(4000);
    cy.getCypress("matches-link").should("be.visible");
    cy.getCypress("matches-link").click();
  });
});

export {};
