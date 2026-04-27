import BasePage from './BasePage';
import { HOME_SELECTORS as SELECTORS } from '../support/selectors/HomePageSelectors';

/**
 * Page Object for the Home Dashboard.
 * Handles both Admin and Customer home views.
 */
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

  /**
   * Verifies if a user is correctly rendered in the users table.
   * Scopes assertions within the matching table row for isolation.
   * @param {object} user - The user object to verify
   * @param {string} user.nome - The name of the user
   * @param {string} user.email - The email of the user
   * @param {string} user.password - The user password
   * @param {string} user.administrador - Admin flag ('true'/'false')
   */
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

  /**
   * Verifies if a product is correctly rendered in the products table.
   * Scopes assertions within the matching table row for isolation.
   * @param {object} product - The product object to verify
   * @param {string} product.nome - The name of the product
   * @param {number} product.preco - The product price
   * @param {string} product.descricao - The description of the product
   * @param {number} product.quantidade - The product quantity
   */
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
  /**
   * Deletes a product from the listing by clicking the Excluir button in its row.
   * @param {string} productName - The product name to locate the row
   */
  deleteProductFromTable(productName) {
    cy.contains('tr', productName)
      .find('.btn-danger')
      .click();
  }

  /**
   * Verifies that a product name no longer appears in the listing.
   * @param {string} productName - The product name that should be absent
   */
  verifyProductNotInTable(productName) {
    cy.contains(productName).should('not.exist');
  }

  logout() {
    cy.get(SELECTORS.BTN_LOGOUT).click();
  }
}

export default new HomePage();
