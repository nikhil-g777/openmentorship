/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add(
  "getCypress",
  (attribute: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-cy=${attribute}]`);
  }
);

Cypress.Commands.add("setSession", (token: string) => {
  cy.session("Set Session", () => {
    cy.setCookie("next-auth.session-token", token);
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getCypress(attribute: string): Chainable<JQuery<HTMLElement>>;
      setSession(token: string): void;
    }
  }
}

const customCommands = {};
export default customCommands;
