// import '@testing-library/cypress/add-commands'
/// <reference types="cypress" />

context("Test Footer:", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(".open home link", () => {
    cy.get("[data-testid='footer']").find(".fa-home").click();
    cy.url().should("include", "/");
  });

  it(".open Munich link", () => {
    cy.get("[data-testid='footer']").contains("Munich").invoke("removeAttr", "target").click();
    cy.url().should("include", "www.comsystoreply.de");
  });
  it(".open Legal notice link", () => {
    cy.get("[data-testid='footer']").contains("Legal notice").invoke("removeAttr", "target").click();
    cy.url().should("include", "legal.comsysto.com/comsystoreply.de/en/impressum/");
  });
});
