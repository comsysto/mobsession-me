/// <reference types="cypress" />

context("Test general controls", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
  });

  it(".check fullscreen button", () => {
    cy.get("[data-testid='fullscreen-icon']").click();
    cy.get("[data-testid='footer']").should("not.exist");
  });

  it(".test copy URL button", () => {
    cy.visit("/");
    const sessionname = "random-sessionname";
    const url = `http://localhost:3000/random-sessionname`;
    cy.get("[data-testid='sessionname-input']").clear().type(`${sessionname}`);
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='copy-checkbox']").click(); // uncheck copy-checkbox
    cy.get("[data-testid='join-button']").click();
    cy.get("[data-testid='clipboard-icon']").click({ force: true });
    cy.task("getClipboard").should("equal", url);
  });

  it(".check leave button", () => {
    cy.get("[data-testid='leave-icon']").click();
    cy.contains("Join a MobSession");
  });
});
