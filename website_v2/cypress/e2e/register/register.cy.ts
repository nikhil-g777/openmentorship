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

  it("Test registration", () => {
    // Visit register page
    cy.visit("/register");

    // Check main screen fields
    cy.getCypress("register-main-linkedin-profile-url-field").should("exist");
    cy.getCypress("register-main-linkedin-profile-url-field").should(
      "be.visible"
    );
    cy.getCypress("register-main-linkedin-profile-url-field").click();
    cy.getCypress("register-main-linkedin-profile-url-field").type(
      "https://www.linkedin.com/op-cypress-test"
    );
    cy.getCypress("register-main-linkedin-error").should("exist");
    cy.getCypress("register-main-linkedin-error").should("be.visible");
    cy.getCypress("register-main-linkedin-error").should(
      "contain.text",
      "Please enter a valid LinkedIn profile URL."
    );
    cy.getCypress("register-main-linkedin-profile-url-field").clear();
    cy.getCypress("register-main-linkedin-profile-url-field").type(
      "https://www.linkedin.com/in/openmentorship-cypress-test"
    );
    cy.getCypress("register-main-linkedin-error").should("not.exist");
    cy.getCypress("register-main-headline-field").should("exist");
    cy.getCypress("register-main-headline-field").should("be.visible");
    cy.getCypress("register-main-headline-field").click();
    cy.getCypress("register-main-headline-field").type("ab");
    cy.getCypress("register-main-headline-error").should("exist");
    cy.getCypress("register-main-headline-error").should("be.visible");
    cy.getCypress("register-main-headline-error").should(
      "contain.text",
      "Your headline should be between 3 and 100 characters."
    );
    cy.getCypress("register-main-headline-field").clear();
    cy.getCypress("register-main-headline-field").type(
      "Open Mentorship Cypress Test"
    );
    cy.getCypress("register-main-headline-error").should("not.exist");
    cy.getCypress("register-main-bio-field").should("exist");
    cy.getCypress("register-main-bio-field").should("be.visible");
    cy.getCypress("register-main-bio-field").click();
    cy.getCypress("register-main-bio-field").type("ab");
    cy.getCypress("register-main-bio-error").should("exist");
    cy.getCypress("register-main-bio-error").should("be.visible");
    cy.getCypress("register-main-bio-error").should(
      "contain.text",
      "Your bio should be between 150 and 300 characters long."
    );
    cy.getCypress("register-main-bio-field").clear();
    cy.getCypress("register-main-bio-field").type(
      "Open Mentorship Cypress Test Open Mentorship Cypress Test Open Mentorship Cypress Test Open Mentorship Cypress Test Open Mentorship Cypress Test Open Mentorship Cypress Test"
    );
    cy.getCypress("register-main-bio-error").should("not.exist");
    cy.getCypress("register-main-continue-button").should("exist");
    cy.getCypress("register-main-continue-button").should("be.visible");
    cy.getCypress("register-main-continue-button").should("not.be.disabled");
    cy.getCypress("register-main-continue-button").click();
  });
});
