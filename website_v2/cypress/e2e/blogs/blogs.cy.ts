describe("Blogs Page load test", () => {
  it("Check content text and image", () => {
    cy.visit("/blogs");

    cy.get("body").should("exist");
    cy.get("head").should("exist");
    cy.get("head")
      .get("title")
      .should("contain.text", "OpenMentorship - All Blogs");

    cy.getCypress("blogs-title-h1").should("contain.text", "All Blogs");
    cy.getCypress("blogs-card-thumbnail").should("be.visible");
    cy.getCypress("blogs-card-title").should("be.visible");
    cy.getCypress("blogs-card-title").should("have.length.greaterThan", 0);
    cy.getCypress("blogs-card-description").should("be.visible");
    cy.getCypress("blogs-card-description").should(
      "have.length.greaterThan",
      0
    );
    cy.getCypress("blogs-card-author").should("be.visible");
    cy.getCypress("blogs-card-author").should("have.length.greaterThan", 0);
    cy.getCypress("blogs-card-read-more-button").should("be.visible");
    cy.getCypress("blogs-card-read-more-button").should(
      "contain.text",
      "Read more"
    );
  });

  it("should display a list of blog posts", () => {
    cy.visit("/blogs");
    cy.getCypress("blogs-card-container").should("exist");
    cy.getCypress("blogs-card-container")
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("should allow the user to click on a blog post and navigate to its page", () => {
    cy.visit("/blogs");
    cy.getCypress("blogs-card").should("exist");
    cy.getCypress("blogs-card").should("be.visible");
    cy.getCypress("blogs-card").first().click();
    cy.url().should("include", "/blogs/");
    cy.getCypress("all-blogs-link").should("exist");
    cy.getCypress("all-blogs-link").should("be.visible");
    cy.getCypress("all-blogs-link").should("contain.text", "❮ All Blogs");
    cy.getCypress("blog-content-title").should("exist");
    cy.getCypress("blog-content-title").should("be.visible");
    cy.getCypress("blog-content-title").should("have.length.greaterThan", 0);
    cy.getCypress("blog-content-header-image").should("exist");
    cy.getCypress("blog-content-header-image").should("be.visible");
    cy.getCypress("blog-content-author").should("exist");
    cy.getCypress("blog-content-author").should("be.visible");
    cy.getCypress("blog-content-author").should("have.length.greaterThan", 0);
    cy.getCypress("blog-content-date").should("exist");
    cy.getCypress("blog-content-date").should("be.visible");
    cy.getCypress("blog-content-date").should("have.length.greaterThan", 0);
    cy.getCypress("blog-content-markdown").should("exist");
    cy.getCypress("blog-content-markdown").should("be.visible");
    cy.getCypress("blog-content-markdown").should("have.length.greaterThan", 0);
    cy.getCypress("all-blogs-link").click();
    cy.url().should("include", "/blogs");
  });
});

export {};
