import BasePage from './BasePage';
import { LOGIN_SELECTORS as SELECTORS } from '../support/selectors/LoginPageSelectors';

class LoginPage extends BasePage {
  constructor() {
    super('/login');
  }

  /**
   * Fills the login form with credentials.
   * @param {string} email - User email
   * @param {string} password - User password
   */
  fillCredentials(email, password) {
    cy.get(SELECTORS.INPUT_EMAIL).clear().type(email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear().type(password, { log: false });
  }

  submit() {
    cy.get(SELECTORS.BTN_ENTER).click();
  }

  navigateToSignup() {
    cy.get(SELECTORS.LINK_REGISTER).click();
  }

  assertRedirectedToHome() {
    this.assertUrl('/admin/home');
  }

  /**
   * Asserts that a login error message is visible.
   * @param {string} message - Expected error text
   */
  assertLoginError(message) {
    this.assertAlert(message);
  }
}

export default new LoginPage();
