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
    if (Cypress.env("NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE") === "mentor") {
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

    // Check step2 fields
    cy.getCypress("register-step2-heading").should("exist");
    cy.getCypress("register-step2-heading").should("be.visible");
    cy.getCypress("register-step2-heading").should("contain.text", "About You");
    cy.getCypress("register-step2-sub-heading").should("exist");
    cy.getCypress("register-step2-sub-heading").should("be.visible");
    cy.getCypress("register-step2-sub-heading")
      .first()
      .should("contain.text", "Work Experience");
    cy.getCypress("register-step2-sub-heading")
      .last()
      .should("contain.text", "Education");
    cy.getCypress("register-step2-add-button").should("exist");
    cy.getCypress("register-step2-add-button").should("be.visible");
    cy.getCypress("register-step2-add-button")
      .first()
      .should("contain.text", "Add Experience");
    cy.getCypress("register-step2-add-button")
      .last()
      .should("contain.text", "Add Education");
    cy.getCypress("register-step2-continue").should("exist");
    cy.getCypress("register-step2-continue").should("be.visible");
    cy.getCypress("register-step2-continue").should("be.enabled");
    cy.getCypress("register-step2-continue").click();
    cy.getCypress("register-step2-experience-error").should("exist");
    cy.getCypress("register-step2-experience-error").should("be.visible");
    cy.getCypress("register-step2-experience-error").should(
      "contain.text",
      "Please add at least one experience"
    );
    cy.getCypress("register-step2-add-button").first().click();
    cy.getCypress("register-step2-remove-button").first().should("exist");
    cy.getCypress("register-step2-remove-button").first().should("be.visible");
    cy.getCypress("register-step2-remove-button").first().click();
    cy.getCypress("register-step2-add-button").first().click();
    cy.getCypress("register-step2-first-input").first().should("exist");
    cy.getCypress("register-step2-first-input").first().should("be.visible");
    cy.getCypress("register-step2-first-input").first().click();
    cy.getCypress("register-step2-first-input").first().type("Test");
    cy.getCypress("register-step2-second-input").first().should("exist");
    cy.getCypress("register-step2-second-input").first().should("be.visible");
    cy.getCypress("register-step2-second-input").first().click();
    cy.getCypress("register-step2-second-input").first().type("Test");
    cy.getCypress("register-step2-add-button").first().click();
    cy.getCypress("register-step2-experience-error").should("exist");
    cy.getCypress("register-step2-experience-error").should("be.visible");
    cy.getCypress("register-step2-experience-error").should(
      "contain.text",
      "Organization and title cannot be same"
    );
    cy.getCypress("register-step2-second-input").first().click();
    cy.getCypress("register-step2-second-input").first().clear();
    cy.getCypress("register-step2-second-input").first().type("Test 2");
    cy.getCypress("register-step2-add-button").last().click();
    cy.getCypress("register-step2-add-button").last().click();
    cy.getCypress("register-step2-education-error").should(
      "contain.text",
      "Please fill all fields"
    );
    cy.getCypress("register-step2-remove-button").last().should("exist");
    cy.getCypress("register-step2-remove-button").last().should("be.visible");
    cy.getCypress("register-step2-remove-button").last().click();
    cy.getCypress("register-step2-add-button").last().click();
    cy.getCypress("register-step2-first-input").last().should("exist");
    cy.getCypress("register-step2-first-input").last().should("be.visible");
    cy.getCypress("register-step2-first-input").last().click();
    cy.getCypress("register-step2-first-input").last().type("Test");
    cy.getCypress("register-step2-second-input").last().should("exist");
    cy.getCypress("register-step2-second-input").last().should("be.visible");
    cy.getCypress("register-step2-second-input").last().click();
    cy.getCypress("register-step2-second-input").last().type("Test");
    cy.getCypress("register-step2-add-button").last().click();
    cy.getCypress("register-step2-education-error").should("exist");
    cy.getCypress("register-step2-education-error").should("be.visible");
    cy.getCypress("register-step2-education-error").should(
      "contain.text",
      "School and degree cannot be same"
    );
    cy.getCypress("register-step2-second-input").last().click();
    cy.getCypress("register-step2-second-input").last().clear();
    cy.getCypress("register-step2-second-input").last().type("Test 2");
    cy.getCypress("register-step2-continue").click();
    cy.getCypress("register-step2-experience-error").should("not.exist");
    cy.getCypress("register-step2-education-error").should("not.exist");

    // Check step3 fields
    cy.getCypress("register-step3-heading").should("exist");
    cy.getCypress("register-step3-heading").should("be.visible");
    cy.getCypress("register-step3-heading").should(
      "contain.text",
      "Let's get more specific"
    );
    cy.getCypress("register-step3-sub-heading").should("exist");
    cy.getCypress("register-step3-sub-heading").should("be.visible");
    cy.getCypress("register-step3-sub-heading")
      .first()
      .should("contain.text", "What are some of your top skills?");
    cy.getCypress("register-step3-sub-heading")
      .last()
      .should("contain.text", "What are your areas of interest?");
    cy.getCypress("register-step3-info").should("exist");
    cy.getCypress("register-step3-info").should("be.visible");
    cy.getCypress("register-step3-info")
      .first()
      .should("contain.text", "Web Development");
    cy.getCypress("register-step3-info")
      .last()
      .should("contain.text", "Startups");
    cy.getCypress("register-step3-continue").should("exist");
    cy.getCypress("register-step3-continue").should("be.visible");
    cy.getCypress("register-step3-continue").click();
    cy.getCypress("register-step3-skills-error").should("exist");
    cy.getCypress("register-step3-skills-error").should("be.visible");
    cy.getCypress("register-step3-skills-error").should(
      "contain.text",
      "Please add at least one skill"
    );
    cy.getCypress("register-step3-input").first().should("exist");
    cy.getCypress("register-step3-input").first().should("be.visible");
    cy.getCypress("register-step3-input").first().click();
    cy.getCypress("register-step3-input").first().type("Test");
    cy.getCypress("register-step3-add-button").first().click();
    cy.getCypress("register-step3-continue").click();
    cy.getCypress("register-step3-interests-error").should("exist");
    cy.getCypress("register-step3-interests-error").should("be.visible");
    cy.getCypress("register-step3-interests-error").should(
      "contain.text",
      "Please add at least one interest"
    );
    cy.getCypress("register-step3-input").last().should("exist");
    cy.getCypress("register-step3-input").last().should("be.visible");
    cy.getCypress("register-step3-input").last().click();
    cy.getCypress("register-step3-input").last().type("Test");
    cy.getCypress("register-step3-add-button").last().click();
    cy.getCypress("register-step3-delete-button").first().should("exist");
    cy.getCypress("register-step3-delete-button").first().should("be.visible");
    cy.getCypress("register-step3-delete-button").first().click();
    cy.getCypress("register-step3-input").first().type("Test");
    cy.getCypress("register-step3-add-button").first().click();
    cy.getCypress("register-step3-delete-button").last().should("exist");
    cy.getCypress("register-step3-delete-button").last().should("be.visible");
    cy.getCypress("register-step3-delete-button").last().click();
    cy.getCypress("register-step3-input").last().type("Test");
    cy.getCypress("register-step3-add-button").last().click();
    cy.getCypress("register-step3-continue").click();

    // Check step4 fields
    cy.getCypress("register-step4-heading").should("exist");
    cy.getCypress("register-step4-heading").should("be.visible");
    cy.getCypress("register-step4-heading").should(
      "contain.text",
      "Mentorship"
    );
    cy.getCypress("register-step4-goals-heading").should("exist");
    cy.getCypress("register-step4-goals-heading").should("be.visible");
    cy.getCypress("register-step4-goals-heading").should(
      "contain.text",
      Cypress.env("NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE") === "mentor"
        ? "What are you available to offer to your mentee? Select all that apply."
        : "What do you need from your mentor? Select all that apply."
    );
    cy.getCypress("register-step4-continue").should("exist");
    cy.getCypress("register-step4-continue").should("be.visible");
    cy.getCypress("register-step4-continue").click();
    cy.getCypress("register-step4-goals-error").should("exist");
    cy.getCypress("register-step4-goals-error").should("be.visible");
    cy.getCypress("register-step4-goals-error").should(
      "contain.text",
      "Please select at least one goal"
    );
    cy.getCypress("register-step4-goals-checkbox").first().should("exist");
    cy.getCypress("register-step4-goals-checkbox").first().should("be.visible");
    cy.getCypress("register-step4-goals-checkbox").first().check();
    cy.getCypress("register-step4-frequency-heading").should("exist");
    cy.getCypress("register-step4-frequency-heading").should("be.visible");
    cy.getCypress("register-step4-frequency-heading").should(
      "contain.text",
      "How often would you expect to communicate in your mentorship?"
    );
    cy.getCypress("register-step4-continue").click();
    cy.getCypress("register-step4-frequency-error").should("exist");
    cy.getCypress("register-step4-frequency-error").should("be.visible");
    cy.getCypress("register-step4-frequency-error").should(
      "contain.text",
      "Please select a frequency"
    );
    cy.getCypress("register-step4-frequency-radio").first().should("exist");
    cy.getCypress("register-step4-frequency-radio")
      .first()
      .should("be.visible");
    cy.getCypress("register-step4-frequency-radio").first().check();
    cy.getCypress("register-step4-preferences-heading").should("exist");
    cy.getCypress("register-step4-preferences-heading").should("be.visible");
    cy.getCypress("register-step4-preferences-heading").should(
      "contain.text",
      "What are your communication preferences? Select all that apply."
    );
    cy.getCypress("register-step4-continue").click();
    cy.getCypress("register-step4-preferences-error").should("exist");
    cy.getCypress("register-step4-preferences-error").should("be.visible");
    cy.getCypress("register-step4-preferences-error").should(
      "contain.text",
      "Please select at least one preference"
    );
    cy.getCypress("register-step4-preferences-checkbox")
      .first()
      .should("exist");
    cy.getCypress("register-step4-preferences-checkbox")
      .first()
      .should("be.visible");
    cy.getCypress("register-step4-preferences-checkbox").first().check();
    cy.getCypress("register-step4-continue").click();

    // Check step5 fields
    cy.getCypress("register-step5-heading").should("exist");
    cy.getCypress("register-step5-heading").should("be.visible");
    cy.getCypress("register-step5-heading").should(
      "contain.text",
      "Add social links and showcase your work"
    );
    cy.getCypress("register-step5-social-links-input").should("exist");
    cy.getCypress("register-step5-social-links-input").should("be.visible");
    cy.getCypress("register-step5-social-links-input").last().click();
    cy.getCypress("register-step5-social-links-input").last().type("Test");
    cy.getCypress("register-step5-continue").should("exist");
    cy.getCypress("register-step5-continue").should("be.visible");
    cy.getCypress("register-step5-continue").click();
    cy.getCypress("register-step5-social-links-error").should("exist");
    cy.getCypress("register-step5-social-links-error").should("be.visible");
    cy.getCypress("register-step5-social-links-error").should(
      "contain.text",
      "Invalid url"
    );
    cy.getCypress("register-step5-social-links-input").last().click();
    cy.getCypress("register-step5-social-links-input").last().clear();
    cy.getCypress("register-step5-social-links-input")
      .last()
      .type("https://openmentorship.com");
    cy.getCypress("register-step5-continue").click();

    // Check post registration
    cy.getCypress("register-post-registration-heading").should("exist");
    cy.getCypress("register-post-registration-heading").should("be.visible");
    cy.getCypress("register-post-registration-heading").should(
      "contain.text",
      "Registration complete, here are your next steps:"
    );
    cy.getCypress("register-post-registration-guidelines-image").should(
      "exist"
    );
    cy.getCypress("register-post-registration-guidelines-image").should(
      "be.visible"
    );
    cy.getCypress("register-post-registration-guidelines").should("exist");
    cy.getCypress("register-post-registration-guidelines").should("be.visible");
    if (Cypress.env("NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE") === "mentee") {
      cy.getCypress("register-post-registration-guidelines")
        .first()
        .should(
          "contain.text",
          "You will recieve an email confirmation of your registration."
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(1)
        .should(
          "contain.text",
          "Explore and find mentors based on your interests and goals."
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(2)
        .should(
          "contain.text",
          "Send a request to connect with mentors you like. Be specific about what you are looking for."
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(3)
        .should(
          "contain.text",
          "Sit tight, the mentors will have one week to accept your request."
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(4)
        .should("contain.text", "Connect with your mentor. Make it count!");
    }
    if (Cypress.env("NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE") === "mentor") {
      cy.getCypress("register-post-registration-guidelines")
        .first()
        .should(
          "contain.text",
          "You will recieve an email confirmation of your registration."
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(1)
        .should(
          "contain.text",
          "Mentees will find you and send a connection request based on your profile and their goals (Ps: You can mentor upto 3 people at a time)"
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(2)
        .should(
          "contain.text",
          "You will have 1 week from the time of the request to review and respond. (Ps: Don't leave them hanging)"
        );
      cy.getCypress("register-post-registration-guidelines")
        .eq(3)
        .should(
          "contain.text",
          "Connect with your mentee. Time to be a sherpa!"
        );
    }
    cy.getCypress("register-post-registration-continue").should("exist");
    cy.getCypress("register-post-registration-continue").should("be.visible");
    cy.getCypress("register-post-registration-continue").should(
      "contain.text",
      "Got it!"
    );
    cy.getCypress("register-post-registration-continue").click();
    // url should be /
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
