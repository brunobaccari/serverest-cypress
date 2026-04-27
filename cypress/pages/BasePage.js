/**
 * Base class for all Page Objects.
 * Provides shared navigation, submission, and assertion methods
 * to eliminate duplication across page-specific classes.
 */
export default class BasePage {
  /**
   * @param {string} path - The URL path this page represents
   */
  constructor(path) {
    this.path = path;
  }

  visit() {
    cy.visit(this.path);
  }

  /**
   * Clicks a submit/action button by selector.
   * @param {string} selector - CSS selector for the button
   */
  submit(selector) {
    cy.get(selector).click();
  }

  /**
   * Asserts that an alert is visible and contains the expected text.
   * @param {string} text - Expected text inside the alert
   */
  assertAlert(text) {
    cy.get('.alert')
      .should('be.visible')
      .and('contain.text', text);
  }

  /**
   * Asserts that the current URL contains a fragment.
   * @param {string} fragment - URL substring to verify
   */
  assertUrl(fragment) {
    cy.url().should('include', fragment);
  }

  /**
   * Asserts that multiple required validation messages are visible.
   * @param {string[]} messages - List of expected error messages
   */
  assertValidationErrors(messages) {
    messages.forEach((msg) => {
      cy.contains('.alert', msg).should('be.visible');
    });
  }
}
