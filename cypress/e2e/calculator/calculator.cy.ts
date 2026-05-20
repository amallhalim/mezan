describe("Calculator Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/ar/calculator");
  });

  it("should display the calculator", () => {
    cy.get("[aria-label='Foods list']").should("be.visible");
  });

  it("find first item and show it details", () => {
    cy.get("[aria-label='Foods list']").first().click();
    cy.get("[aria-label='Food details']").should("be.visible");
  });
});
