import BasePage from './BasePage';
import { PRODUCT_FORM_SELECTORS as SELECTORS } from '../support/selectors/ProductFormPageSelectors';

class ProductFormPage extends BasePage {
  constructor() {
    super('/admin/cadastrarprodutos');
  }

  /**
   * Fills the product creation form.
   * @param {object} product - Product data
   * @param {string} product.nome - Product name
   * @param {number|string} product.preco - Product price
   * @param {string} product.descricao - Product description
   * @param {boolean} [product.imagem=false] - Whether to attach a test image
   */
  fillForm({ nome, preco, descricao, quantidade, imagem }) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(nome);
    cy.get(SELECTORS.INPUT_PRICE).clear().type(String(preco));
    cy.get(SELECTORS.INPUT_DESC).clear().type(descricao);
    cy.get(SELECTORS.INPUT_QUANTITY).clear().type(String(quantidade));
    imagem && cy.get(SELECTORS.INPUT_IMAGE).selectFile('public/banana.png');
  }

  submit() {
    cy.get(SELECTORS.BTN_SUBMIT).click();
  }

  assertOnCreatePage() {
    this.assertUrl('/admin/cadastrarprodutos');
  }

  assertSuccessMessage() {
    cy.get(SELECTORS.ALERT).should('be.visible');
  }
}

export default new ProductFormPage();
