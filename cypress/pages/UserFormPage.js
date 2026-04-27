import BasePage from './BasePage';
import { USER_FORM_SELECTORS as SELECTORS } from '../support/selectors/UserFormPageSelectors';

class UserFormPage extends BasePage {
  constructor() {
    super('/admin/cadastrarusuarios');
  }

  assertOnCreatePage() {
    this.assertUrl('/admin/cadastrarusuarios');
  }

  /**
   * Preenche o formulário de criação de usuário.
   * @param {object} user - Dados do usuário
   * @param {string} user.nome - Nome completo
   * @param {string} user.email - Endereço de e-mail
   * @param {string} user.password - Senha
   * @param {string} [user.administrador='false'] - Flag de administrador
   */
  fillForm(user) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(user.nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear().type(user.email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear().type(user.password, { log: false });

    if (user.administrador === 'true') {
      cy.get(SELECTORS.CHECKBOX_ADMIN).check();
    }
  }

  submit() {
    cy.get(SELECTORS.BTN_SUBMIT).click();
  }
}

export default new UserFormPage();


