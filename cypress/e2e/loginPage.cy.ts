describe("visit google", () => {
  beforeEach(() => {
    cy.visit("https://practicetestautomation.com/practice-test-login/");
  });

  it("login correct", () => {
    cy.get('[role="main"]').should("be.visible");

    cy.get("#username").type("student");

    cy.get("#password").type("Password123");

    cy.get("#submit").click();
    cy.contains("Logged In Successfully");
  });
  it("login wrong", () => {
    cy.get('[role="main"]').should("be.visible");

    cy.get("#username").type("incorrectUser");

    cy.get("#password").type("Password123 fgf");

    cy.get("#submit").click();
    cy.contains("Your username is invalid!");
  });
  it("Negative password test", () => {
    cy.get('[role="main"]').should("be.visible");

    cy.get("#username").type("student");

    cy.get("#password").type("incorrectPassword ");

    cy.get("#submit").click();
    cy.contains("Your password is invalid!");
  });
});
