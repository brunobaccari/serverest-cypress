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
   * Fills the user creation form.
   * @param {object} user - User data
   * @param {string} user.nome - Full name
   * @param {string} user.email - Email address
   * @param {string} user.password - Password
   * @param {string} [user.administrador='false'] - Admin flag
   */
  fillForm(user) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(user.nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear().type(user.email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear().type(user.password, { log: false });
    cy.get(SELECTORS.CHECKBOX_ADMIN)[user.administrador === 'true' ? 'check' : 'uncheck']();
  }

  submit() {
    cy.get(SELECTORS.BTN_SUBMIT).click();
  }
}

export default new UserFormPage();
