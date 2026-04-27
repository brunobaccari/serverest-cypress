import BasePage from './BasePage';
import { HOME_SELECTORS as SELECTORS } from '../support/selectors/HomePageSelectors';

class HomePage extends BasePage {
  constructor() {
    super('/admin/home');
  }

  assertIsVisible() {
    this.assertUrl('/admin/home');
    cy.get(SELECTORS.HEADING).should('be.visible');
  }

  assertIsCustomerHome() {
    this.assertUrl('/home');
    cy.get(SELECTORS.SEARCH_INPUT).should('be.visible');
  }

  clickCreateProduct() {
    cy.get(SELECTORS.BTN_CREATE_PRODUCT).click();
  }

  clickCreateUser() {
    cy.get(SELECTORS.BTN_CREATE_USER).click();
  }

  navigateToListUsers() {
    cy.get(SELECTORS.LINK_LIST_USERS).click();
  }

  navigateToListProducts() {
    cy.get(SELECTORS.LINK_LIST_PRODUCTS).click();
  }

  assertWelcomeMessage() {
    cy.contains(SELECTORS.TEXT_WELCOME_MSG).should('be.visible');
  }

  assertAdminMenusHidden() {
    cy.get(SELECTORS.BTN_CREATE_PRODUCT).should('not.exist');
    cy.get(SELECTORS.BTN_CREATE_USER).should('not.exist');
  }

  verifyUserInTable(user) {
    cy.contains('tr', user.email)
      .should('be.visible')
      .within(() => {
        cy.get('td').eq(0).should('contain', user.nome);
        cy.get('td').eq(1).should('contain', user.email);
        cy.get('td').eq(2).should('contain', user.password);
        cy.get('td').eq(3).should('contain', user.administrador);
      });
  }

  verifyProductInTable(product) {
    cy.contains('tr', product.nome)
      .should('be.visible')
      .within(() => {
        cy.get('td').eq(0).should('contain', product.nome);
        cy.get('td').eq(1).should('contain', String(product.preco));
        cy.get('td').eq(2).should('contain', product.descricao);
        cy.get('td').eq(3).should('contain', String(product.quantidade));
        cy.get('td').eq(4).invoke('text').should(
          product.imagem ? 'contain' : 'be.empty',
          ...(product.imagem ? ['fakepath'] : [])
        );
      });
  }
  deleteProductFromTable(productName) {
    cy.contains('tr', productName)
      .find('.btn-danger')
      .click();
  }

  verifyProductNotInTable(productName) {
    cy.contains(productName).should('not.exist');
  }

  logout() {
    cy.get(SELECTORS.BTN_LOGOUT).click();
  }
}

export default new HomePage();
