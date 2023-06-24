describe("Page load test", () => {
  it("Check content text and image", () => {
    cy.visit("http://localhost:3010");

    cy.get("body").should("exist");
    cy.get("head").should("exist");
    cy.get("head").get("title").should("contain.text", "Open Mentorship");

    cy.getCypress("landing-hero-h1").should(
      "contain.text",
      "Find a mentor who can help guide you to success."
    );
    cy.getCypress("landing-howItWorks-h1").should(
      "contain.text",
      "How it Works"
    );
    cy.getCypress("landing-whyOpenMentorship-h1").should(
      "contain.text",
      "Why Open Mentorship?"
    );
    cy.getCypress("landing-dreamCareer-h1").should(
      "contain.text",
      "Get on the path of your dream career with us today."
    );
    cy.getCypress("faq-title-h2").should("contain.text", "Got Questions?");
    cy.getCypress("faq-title-h3").should(
      "contain.text",
      "Check out this section for answers to our FAQs"
    );
    cy.getCypress("footer-contact-link").should(
      "contain.text",
      "hello@openmentorship.com"
    );
    cy.getCypress("landing-hero-register-button").should(
      "contain.text",
      "Register"
    );

    cy.getCypress("navbar-logo-img").should("be.visible");
    cy.getCypress("footer-logo-img").should("be.visible");
    cy.getCypress("navbar-profile-img").should("be.visible");
    cy.getCypress("landing-hero-img").should("be.visible");
    cy.getCypress("landing-howItWorks-img").should("be.visible");
    cy.getCypress("landing-dreamCareer-img").should("be.visible");
    cy.getCypress("linkedin-button").should("be.visible");

    cy.getCypress("navbar-profile-img").click();
    cy.getCypress("navbar-profile-about-link").should("contain.text", "About");
    cy.getCypress("navbar-profile-faq-link").should("contain.text", "FAQ");
    cy.getCypress("navbar-profile-login-link").should("contain.text", "Login");
  });
});

export {};

// describe("Login functionality test", () => {
//   it("Login with linkedin", () => {
//     cy.visit("http://localhost:3010/");

//     cy.window().then(win => {
//       cy.stub(win, "open", url => {
//         win.location.href =
//           "https://www.linkedin.com//oauth/v2/authorization?response_type=code&client_id=77jtxd3rs4bat4&redirect_uri=http://localhost:3010/linkedin&scope=r_emailaddress%20r_liteprofile&state=AoYlbKFzL9eCM2GxvPs3";
//       }).as("popup");
//     });

//     cy.getCypress("linkedin-button").should("be.visible");
//     cy.getCypress("linkedin-button").click();

//     cy.get("@popup").should("be.called");

//     cy.origin("https://www.linkedin.com", () => {
//       cy.visit(
//         "/oauth/v2/authorization?response_type=code&client_id=77jtxd3rs4bat4&redirect_uri=http://localhost:3010/linkedin&scope=r_emailaddress%20r_liteprofile&state=AoYlbKFzL9eCM2GxvPs3"
//       );
//       cy.get("#username").click().type(Cypress.env("username"));
//       cy.get("#password").click().type(Cypress.env("password"));
//       cy.get("[data-litms-control-urn=login-submit]").click();
//     });
//   });
// });
