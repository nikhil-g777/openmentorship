describe("Test Login Functionality", () => {
  beforeEach(() => {
    cy.intercept("/api/auth/session", {fixture: "session.json"}).as("session");
  });

  it("Get Temp Auth Token & Set as Cookie", () => {
    cy.visit("/");
    cy.request(
      "POST",
      "https://www.openmentorship.com:4000/users/tempAuth/5f4f10a91a964b7be7fc7737"
    ).then(response => {
      const cookies = response.headers["set-cookie"][0].split(";");
      const token = cookies[0].split("=")[1];
      cy.setSession(token);
    });
    cy.visit("/");
    cy.wait("@session");
  });
});
