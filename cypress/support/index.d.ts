/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Obtém o token de autorização via API de login do ServeRest.
     * @param {string} email - E-mail do usuário
     * @param {string} password - Senha do usuário
     * @example cy.getApiToken('admin@email.com', 'senha123').then(token => ...)
     */
    getApiToken(email: string, password: string): Chainable<string>;

    /**
     * Autentica via API e persiste o token no localStorage usando Cypress Sessions.
     * Armazena o token em Cypress.env('sessionToken') para validação sem DOM.
     * @param {string} email - E-mail do usuário
     * @param {string} password - Senha do usuário
     * @example cy.apiLogin('admin@email.com', 'senha123')
     */
    apiLogin(email: string, password: string): Chainable<any>;

    /**
     * Cria um usuário via API. Silenciosamente bem-sucedido se o e-mail já estiver cadastrado.
     * @param {object} userData - Payload para criação do usuário
     * @example cy.apiCreateUser({ nome: 'Admin', email: '...', password: '...', administrador: 'true' })
     */
    apiCreateUser(userData: {
      nome: string;
      email: string;
      password: string;
      administrador: string;
    }): Chainable<any>;

    /**
     * Deleta um usuário por ID via API.
     * @param {string} userId - Identificador único do usuário
     * @param {string} [token] - Token de autorização (opcional)
     * @example cy.apiDeleteUser('userId123', 'Bearer token')
     */
    apiDeleteUser(userId: string, token?: string): Chainable<any>;

    /**
     * Cria um produto via API. Requer token de autorização.
     * @param {object} productData - Payload do produto
     * @param {string} token - Token de autorização
     * @example cy.apiCreateProduct({ nome: 'Mouse', preco: 100, ... }, 'Bearer token')
     */
    apiCreateProduct(
      productData: {
        nome: string;
        preco: number | string;
        descricao: string;
        quantidade: number;
      },
      token: string
    ): Chainable<string>;

    /**
     * Deleta um produto por ID via API.
     * @param {string} productId - Identificador único do produto
     * @param {string} token - Token de autorização
     * @example cy.apiDeleteProduct('productId123', 'Bearer token')
     */
    apiDeleteProduct(productId: string, token: string): Chainable<any>;

    /**
     * Garante que um usuário seja deletado buscando pelo e-mail e removendo se encontrado.
     * @param {string} email - E-mail do usuário a ser buscado
     * @param {string} token - Token de autorização
     * @example cy.apiEnsureUserDeletedByEmail('user@qa.com', 'Bearer token')
     */
    apiEnsureUserDeletedByEmail(email: string, token: string): Chainable<any>;

    /**
     * Garante que um produto seja deletado buscando pelo nome e removendo se encontrado.
     * @param {string} nome - Nome do produto a ser buscado
     * @param {string} token - Token de autorização
     * @example cy.apiEnsureProductDeletedByName('Produto QA', 'Bearer token')
     */
    apiEnsureProductDeletedByName(nome: string, token: string): Chainable<any>;

    /**
     * Limpa um usuário pelo e-mail usando um token obtido via API.
     * Não depende do DOM — seguro para uso em hooks after().
     * @param {string} email - E-mail do usuário a ser deletado
     * @example cy.apiCleanupUser('user@qa.com')
     */
    apiCleanupUser(email: string): Chainable<any>;

    /**
     * Limpa um produto pelo nome usando um token obtido via API.
     * Não depende do DOM — seguro para uso em hooks after().
     * @param {string} nome - Nome do produto a ser deletado
     * @example cy.apiCleanupProduct('Produto QA')
     */
    apiCleanupProduct(nome: string): Chainable<any>;
  }
}
