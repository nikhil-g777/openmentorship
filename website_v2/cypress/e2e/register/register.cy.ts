describe("Register page test", () => {
  it("Check content text and image", () => {
    cy.visit("/register");
    cy.getCypress("register-hero").should("exist");
    cy.getCypress("register-hero").should("be.visible");
    cy.getCypress("register-main-heading").should("exist");
    cy.getCypress("register-main-heading").should("be.visible");
    cy.getCypress("register-main-heading").should("contain", "Open Mentorship");
    cy.getCypress("register-main-sub-heading").should("exist");
    cy.getCypress("register-main-sub-heading").should("be.visible");
    cy.getCypress("register-main-sub-heading").should(
      "contain",
      "Find a Mentor who can help guide you to success."
    );
    cy.getCypress("register-main-first-name-field").should("exist");
    cy.getCypress("register-main-first-name-field").should("be.visible");
    cy.getCypress("register-main-first-name-field").should(
      "have.length.greaterThan",
      0
    );
    cy.getCypress("register-main-last-name-field").should("exist");
    cy.getCypress("register-main-last-name-field").should("be.visible");
    cy.getCypress("register-main-last-name-field").should(
      "have.length.greaterThan",
      0
    );
    cy.getCypress("register-main-email-field").should("exist");
    cy.getCypress("register-main-email-field").should("be.visible");
    cy.getCypress("register-main-email-field").should(
      "have.length.greaterThan",
      0
    );
  });
});
