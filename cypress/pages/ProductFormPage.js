import BasePage from './BasePage';
import { PRODUCT_FORM_SELECTORS as SELECTORS } from '../support/selectors/ProductFormPageSelectors';

class ProductFormPage extends BasePage {
  constructor() {
    super('/admin/cadastrarprodutos');
  }

  /**
   * Preenche o formulário de criação de produto.
   * @param {object} product - Dados do produto
   * @param {string} product.nome - Nome do produto
   * @param {number|string} product.preco - Preço do produto
   * @param {string} product.descricao - Descrição do produto
   * @param {number|string} product.quantidade - Quantidade do produto
   */
  fillForm({ nome, preco, descricao, quantidade }) {
    cy.get(SELECTORS.INPUT_NAME).clear().type(nome);
    cy.get(SELECTORS.INPUT_PRICE).clear().type(String(preco));
    cy.get(SELECTORS.INPUT_DESC).clear().type(descricao);
    cy.get(SELECTORS.INPUT_QUANTITY).clear().type(String(quantidade));
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


