import { HOME_SELECTORS as SELECTORS } from '../support/selectors/HomePageSelectors';

class HomePage {
  assertIsVisible() {
    cy.url().should('include', '/admin/home');
    cy.get(SELECTORS.HEADING).should('be.visible');
  }

  assertIsCustomerHome() {
    cy.url().should('include', '/home');
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
    cy.contains('Bem Vindo').should('be.visible');
  }

  assertAdminMenusHidden() {
    cy.get(SELECTORS.BTN_CREATE_PRODUCT).should('not.exist');
    cy.get(SELECTORS.BTN_CREATE_USER).should('not.exist');
  }

  verifyUserInTable(user) {
    cy.contains('tr', user.email)
      .should('be.visible')
      .within(() => {
        cy.get('td').should('contain', user.nome);
        cy.get('td').should('contain', user.email);
        cy.get('td').eq(2).invoke('text').should('not.be.empty');
      });
  }

  verifyProductInTable(product) {
    cy.contains('tr', product.nome)
      .should('be.visible')
      .within(() => {
        cy.get('td').should('contain', product.nome);
        cy.get('td').should('contain', product.descricao);

        cy.get('td').eq(1).invoke('text').should('not.be.empty');
        cy.get('td').eq(3).invoke('text').should('not.be.empty');
      });
  }

  logout() {
    cy.get(SELECTORS.BTN_LOGOUT).click();
  }
}

export default new HomePage();


