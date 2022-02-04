/// <reference types="cypress" />

context("Test participant controls", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
  });

  it(".check person button", () => {
    cy.get("[data-testid='clickable-group']").click();
    cy.get("[data-testid='participant-background']");
    cy.get("[data-testid='delete-icon']");
    cy.get("[data-testid='driver-icon']");
    cy.get("[data-testid='navigator-icon']");
  });
  it(".check remove button", () => {
    cy.get("[data-testid='clickable-group']").click();
    cy.get("[data-testid='delete-icon']").click({ force: true });
    cy.contains("Join a MobSession");
  });
  it(".check make to navigator button", () => {
    cy.get("[data-testid='clickable-group']").click();
    cy.get("[data-testid='navigator-icon']").click();
    cy.get("[data-testid='speaker-icon'");
  });
  it(".check make to driver button", () => {
    cy.get("[data-testid='clickable-group']").click();
    cy.get("[data-testid='driver-icon']").click();
    cy.get("[data-testid='keyboard-icon'");
  });
});
