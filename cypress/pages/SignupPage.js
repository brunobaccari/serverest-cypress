import BasePage from './BasePage';
import { SIGNUP_SELECTORS as SELECTORS } from '../support/selectors/SignupPageSelectors';

class SignupPage extends BasePage {
  constructor() {
    super('/cadastrarusuarios');
  }

  fillForm({ nome, email, password, administrador = 'false' }) {
    cy.get(SELECTORS.INPUT_NAME).clear();
    cy.get(SELECTORS.INPUT_NAME).type(nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear();
    cy.get(SELECTORS.INPUT_EMAIL).type(email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear();
    cy.get(SELECTORS.INPUT_PASSWORD).type(password, { log: false });
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
