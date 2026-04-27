import BasePage from './BasePage';
import { LOGIN_SELECTORS as SELECTORS } from '../support/selectors/LoginPageSelectors';

class LoginPage extends BasePage {
  constructor() {
    super('/login');
  }

  /**
   * Preenche as credenciais de login no formulário.
   * @param {string} email - E-mail do usuário
   * @param {string} password - Senha do usuário
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
   * Verifica se uma mensagem de erro de login está visível.
   * @param {string} message - Texto de erro esperado
   */
  assertLoginError(message) {
    this.assertAlert(message);
  }
}

export default new LoginPage();


