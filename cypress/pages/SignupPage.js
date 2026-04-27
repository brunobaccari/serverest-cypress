import BasePage from './BasePage';
import { SIGNUP_SELECTORS as SELECTORS } from '../support/selectors/SignupPageSelectors';

class SignupPage extends BasePage {
  constructor() {
    super('/cadastrarusuarios');
  }

  /**
   * Fills the signup form with user data.
   * @param {object} param0 - User data
   * @param {string} param0.nome - Full name
   * @param {string} param0.email - Email address
   * @param {string} param0.password - Password
   * @param {string} [param0.administrador='false'] - Admin flag
   */
  fillForm({ nome, email, password, administrador = 'false' }) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear().type(email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear().type(password, { log: false });
    cy.get(SELECTORS.CHECKBOX_ADMIN)[administrador === 'true' ? 'check' : 'uncheck']();
  }

  submit() {
    cy.get(SELECTORS.BTN_REGISTER).click();
  }

  assertRedirectedToHome() {
    this.assertUrl('/admin/home');
  }

  assertSuccessMessage() {
    this.assertAlert('Cadastro realizado com sucesso');
  }
}

export default new SignupPage();
