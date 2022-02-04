/// <reference types="cypress" />

context("Test clock controls", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
  });

  it(".check start button", () => {
    cy.get("[data-testid='play-icon']").click();
    cy.get("[data-testid='play-icon']").should("not.exist");
    cy.get("[data-testid='stop-icon']");
  });
  it(".check reset button", () => {
    cy.get("[data-testid='play-icon']").click();
    cy.wait(1000);
    cy.get("[data-testid='reset-icon']").click({ force: true });
    cy.contains("10");
    cy.get("[data-testid='play-icon']");
  });
  it(".check stop button", () => {
    cy.get("[data-testid='play-icon']").click();
    cy.wait(1000);
    cy.get("[data-testid='stop-icon']").click({ force: true });
    cy.get("[data-testid='stop-icon']").should("not.exist");
    cy.contains("09");
    cy.contains("59");
  });
});
