export default class BasePage {
  constructor(path) {
    this.path = path;
  }

  visit() {
    cy.visit(this.path);
  }

  submit(selector) {
    cy.get(selector).click();
  }

  assertAlert(text) {
    cy.get('.alert')
      .should('be.visible')
      .and('contain.text', text);
  }

  assertUrl(fragment) {
    cy.url().should('include', fragment);
  }
}


