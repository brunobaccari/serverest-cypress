import BasePage from './BasePage';
import { USER_FORM_SELECTORS as SELECTORS } from '../support/selectors/UserFormPageSelectors';

class UserFormPage extends BasePage {
  constructor() {
    super('/admin/cadastrarusuarios');
  }

  assertOnCreatePage() {
    this.assertUrl('/admin/cadastrarusuarios');
  }

  fillForm(user) {
    cy.get(SELECTORS.INPUT_NAME).clear();
    cy.get(SELECTORS.INPUT_NAME).type(user.nome);
    cy.get(SELECTORS.INPUT_EMAIL).clear();
    cy.get(SELECTORS.INPUT_EMAIL).type(user.email);
    cy.get(SELECTORS.INPUT_PASSWORD).clear();
    cy.get(SELECTORS.INPUT_PASSWORD).type(user.password, { log: false });
    cy.get(SELECTORS.CHECKBOX_ADMIN)[user.administrador === 'true' ? 'check' : 'uncheck']();
  }

  submit() {
    cy.get(SELECTORS.BTN_SUBMIT).click();
  }
}

export default new UserFormPage();
