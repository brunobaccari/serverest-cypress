/**
 * Classe base para todos os Page Objects.
 * Fornece métodos compartilhados de navegação, submissão e asserção
 * para eliminar duplicação entre as classes específicas de cada página.
 */
export default class BasePage {
  /**
   * @param {string} path - O caminho da URL que esta página representa
   */
  constructor(path) {
    this.path = path;
  }

  visit() {
    cy.visit(this.path);
  }

  /**
   * Clica em um botão de submissão/ação pelo seletor.
   * @param {string} selector - Seletor CSS do botão
   */
  submit(selector) {
    cy.get(selector).click();
  }

  /**
   * Verifica se um alerta está visível e contém o texto esperado.
   * @param {string} text - Texto esperado dentro do alerta
   */
  assertAlert(text) {
    cy.get('.alert')
      .should('be.visible')
      .and('contain.text', text);
  }

  /**
   * Verifica se a URL atual contém um fragmento.
   * @param {string} fragment - Substring da URL para verificar
   */
  assertUrl(fragment) {
    cy.url().should('include', fragment);
  }
}


