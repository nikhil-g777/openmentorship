describe("Page load test", () => {
  it("Check content text and image", () => {
    cy.visit("/");

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
    cy.getCypress("linkedin-button").should("be.visible");
    cy.getCypress("linkedin-button").should(
      "contain.text",
      "Sign in with LinkedIn"
    );
    cy.getCypress("navbar-logo-img").should("be.visible");
    cy.getCypress("footer-logo-img").should("be.visible");
    cy.getCypress("landing-hero-img").should("be.visible");
    cy.getCypress("landing-howItWorks-img").should("be.visible");
    cy.getCypress("landing-dreamCareer-img").should("be.visible");
    cy.getCypress("linkedin-button").should("be.visible");
    cy.getCypress("blogs-link-unauthenticated").should("be.visible");
    cy.getCypress("blogs-link-unauthenticated").click();
  });
});

export {};
