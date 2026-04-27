/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getApiToken(email: string, password: string): Chainable<string>;

    apiLogin(email: string, password: string): Chainable<any>;

    apiCreateUser(userData: {
      nome: string;
      email: string;
      password: string;
      administrador: string;
    }): Chainable<any>;

    apiDeleteUser(userId: string, token?: string): Chainable<any>;

    apiCreateProduct(
      productData: {
        nome: string;
        preco: number | string;
        descricao: string;
        quantidade: number;
      },
      token: string
    ): Chainable<string>;

    apiDeleteProduct(productId: string, token: string): Chainable<any>;

    apiEnsureUserDeletedByEmail(email: string, token: string): Chainable<any>;

    apiEnsureProductDeletedByName(nome: string, token: string): Chainable<any>;

    apiCleanupUser(email: string): Chainable<any>;

    apiCleanupProduct(nome: string): Chainable<any>;
  }
}
