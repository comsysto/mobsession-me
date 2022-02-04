/// <reference types="cypress" />

context("Test LandingScreen", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(".check valid sessionname", () => {
    cy.get("[data-testid='sessionname-input']")
      .as("session")
      .clear()
      .then(input => {
        const invalidChars = ["!", ".", "_", "?", "+", "("];
        invalidChars.forEach(char => {
          cy.wrap(input).type(char);
          cy.get("[data-testid='join-button']").click();
          cy.contains("Required. Allowed characters: 'A-Z a-z 0-9 -'");
          cy.get("@session").clear();
        });
      });
  });

  it(".check valid username", () => {
    cy.get("[data-testid='nickname-input']").clear();
    cy.get("[data-testid='join-button']").click();
    cy.contains("Required");
  });

  it(".test if copy button is active", () => {
    // by default button is pressed
    cy.get("[data-testid='copy-checkbox']").find(".icon").as("icon").click().find("[data-icon='square']"); // if click one time on button => set icon as unchecked
    cy.get("@icon").click().find("[data-icon='check-square']"); // if click one more time on button => set icon as checked
  });

  it(".test copy URL", () => {
    const sessionname = "random-sessionname";
    const url = `http://localhost:3000/random-sessionname`;
    cy.get("[data-testid='sessionname-input']").clear().type(`${sessionname}`);
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
    cy.task("getClipboard").should("equal", url);
  });

  it(".test join button", () => {
    cy.get("[data-testid='generateId-button']").click();
    cy.get("[data-testid='nickname-input']").type("username");
    cy.get("[data-testid='join-button']").click();
    cy.get("circle");
  });

  it(".test SmartCloud link", () => {
    cy.get("[data-testid='smartCloud-link']").invoke("removeAttr", "target").click();
    cy.url().should("include", "https://www.cloud-starter.com/mob-programming/");
  });
});
