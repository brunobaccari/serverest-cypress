import BasePage from './BasePage';
import { SIGNUP_SELECTORS as SELECTORS } from '../support/selectors/SignupPageSelectors';

class SignupPage extends BasePage {
  constructor() {
    super('/cadastrarusuarios');
  }

  /**
   * Preenche o formulário de cadastro com os dados do usuário.
   * @param {object} param0 - Dados do usuário
   * @param {string} param0.nome - Nome completo
   * @param {string} param0.email - Endereço de e-mail
   * @param {string} param0.password - Senha
   * @param {string} [param0.administrador='false'] - Flag de administrador
   */
  fillForm({ nome, email, password, administrador = 'false' }) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear().type(email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear().type(password, { log: false });
    if (administrador === 'true') {
      cy.get(SELECTORS.CHECKBOX_ADMIN).check();
    }
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


