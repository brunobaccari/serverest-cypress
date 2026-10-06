import './commands';
import { generateUserData, generatedUsers, generatedProducts } from './utils';

before(() => {
  const account = generateUserData(true);
  Cypress.env('userEmail', account.email);
  Cypress.env('userPassword', account.password);
  Cypress.env('userName', account.nome);
  Cypress.env('userAdmin', 'true');
  cy.apiCreateUser(account);
});

after(() => {
  cy.getApiToken(Cypress.env('userEmail'), Cypress.env('userPassword')).then((token) => {
    cy.request({
      method: 'DELETE', url: `${Cypress.env('apiUrl')}/carrinhos/cancelar-compra`,
      headers: { Authorization: token }, log: false,
    }).its('status').should('eq', 200);
    generatedProducts.forEach(({ nome }) => cy.apiEnsureProductDeletedByName(nome, token));
    generatedUsers.forEach(({ email }) => cy.apiEnsureUserDeletedByEmail(email, token));
  });
});
