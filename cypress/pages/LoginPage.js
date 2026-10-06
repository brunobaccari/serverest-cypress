import BasePage from './BasePage';
import { LOGIN_SELECTORS as SELECTORS } from '../support/selectors/LoginPageSelectors';

class LoginPage extends BasePage {
  constructor() {
    super('/login');
  }

  fillCredentials(email, password) {
    cy.get(SELECTORS.INPUT_EMAIL).clear();
    cy.get(SELECTORS.INPUT_EMAIL).type(email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear();
    cy.get(SELECTORS.INPUT_PASSWORD).type(password, { log: false });
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

  assertLoginError(message) {
    this.assertAlert(message);
  }
}

export default new LoginPage();
