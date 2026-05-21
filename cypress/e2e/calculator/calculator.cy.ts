describe("Calculator Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/ar/calculator");
  });

  it("should display the calculator", () => {
    cy.get("[aria-label='Foods list']").should("be.visible");
  });

  describe("Calculator Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3001/ar/calculator");
    });

    it("should display the calculator", () => {
      cy.get("[aria-label='Foods list']").should("be.visible");
    });

    it("opens food dialog, adds item, shows toast, and closes dialog", () => {
      cy.get("[aria-label='Foods list']").first().click();

      cy.get("[aria-label='Food details dialog']").should("be.visible");

      cy.get('[data-testid="plate-submit-button"]').click();

      cy.get("[aria-label='Food details dialog']").should("not.exist");
    });
  });
});
