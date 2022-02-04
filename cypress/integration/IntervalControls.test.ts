/// <reference types="cypress" />

context("Test interval controls", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
  });

  it(".check timer button", () => {
    cy.get("[data-testid='timer-icon']").click({ force: true });
    cy.get("[data-testid='interval-background']");
    cy.get("[data-testid='button-10']");
    cy.get("[data-testid='button-15']");
    cy.get("[data-testid='button-20']");
    cy.get("[data-testid='button-30']");
  });
  it(".check time-interval buttons", () => {
    const arr = [10, 15, 20, 30];
    arr.forEach(val => {
      cy.get("[data-testid='timer-icon']").click({ force: true });
      cy.get(`[data-testid='button-${val}']`).click({ force: true });
      cy.contains(`${val}`);
    });
  });
});
