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

    // Check step1 fields
    cy.getCypress("register-step1-heading").should("exist");
    cy.getCypress("register-step1-heading").should("be.visible");
    cy.getCypress("register-step1-heading").should(
      "contain.text",
      "Tell us a little bit about yourself, it helps make the right connections"
    );
    cy.getCypress("register-step1-user-type-heading").should("exist");
    cy.getCypress("register-step1-user-type-heading").should("be.visible");
    cy.getCypress("register-step1-user-type-heading").should(
      "contain.text",
      "I am registering as a: Mentee"
    );
    cy.getCypress("register-step1-user-type-mentee").should("exist");
    cy.getCypress("register-step1-user-type-mentee").should("be.visible");
    cy.getCypress("register-step1-user-type-mentor").should("exist");
    cy.getCypress("register-step1-user-type-mentor").should("be.visible");
    cy.getCypress("register-step1-user-type-mentor").click();
    cy.getCypress("register-step1-user-type-heading").should(
      "contain.text",
      "I am registering as a: Mentor"
    );
    if (process.env.NEXT_PUBLIC_CYPRESS_USER_TYPE === "mentor") {
      cy.getCypress("register-step1-user-type-mentor").click();
    } else {
      cy.getCypress("register-step1-user-type-mentee").click();
    }
    cy.getCypress("register-step1-career-status-heading").should("exist");
    cy.getCypress("register-step1-career-status-heading").should("be.visible");
    cy.getCypress("register-step1-career-status-heading").should(
      "contain.text",
      "Which of the following best describes you?"
    );
    cy.getCypress("register-step1-career-status-select").should("exist");
    cy.getCypress("register-step1-career-status-select").should("be.visible");
    cy.getCypress("register-step1-career-status-select").select("Student");
    cy.getCypress("register-step1-career-status-select").select("Professional");
    cy.getCypress("register-step1-area-of-interest-heading").should("exist");
    cy.getCypress("register-step1-area-of-interest-heading").should(
      "be.visible"
    );
    cy.getCypress("register-step1-area-of-interest-heading").should(
      "contain.text",
      "What is your area of interest?"
    );
    cy.getCypress("register-step1-continue").should("exist");
    cy.getCypress("register-step1-continue").should("be.visible");
    cy.getCypress("register-step1-continue").click();
    cy.getCypress("register-step1-area-of-interest-error").should("exist");
    cy.getCypress("register-step1-area-of-interest-error").should("be.visible");
    cy.getCypress("register-step1-area-of-interest-error").should(
      "contain.text",
      "Please select at least one area of interest"
    );
    cy.getCypress("register-step1-area-of-interest-software").should("exist");
    cy.getCypress("register-step1-area-of-interest-software").should(
      "be.visible"
    );
    cy.getCypress("register-step1-area-of-interest-software").check();
    cy.getCypress("register-step1-area-of-interest-software").should(
      "be.checked"
    );
    cy.getCypress("register-step1-area-of-interest-design").should("exist");
    cy.getCypress("register-step1-area-of-interest-design").should(
      "be.visible"
    );
    cy.getCypress("register-step1-area-of-interest-design").check();
    cy.getCypress("register-step1-area-of-interest-design").should(
      "be.checked"
    );
    cy.getCypress("register-step1-area-of-interest-other").should("exist");
    cy.getCypress("register-step1-area-of-interest-other").should("be.visible");
    cy.getCypress("register-step1-area-of-interest-other").check();
    cy.getCypress("register-step1-area-of-interest-other").should("be.checked");
    cy.getCypress("register-step1-continue").click();
    cy.getCypress("register-step1-area-of-interest-error").should("not.exist");
  });
});
