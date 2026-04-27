import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import HomePage from '../../pages/HomePage';
import ProductFormPage from '../../pages/ProductFormPage';
import UserFormPage from '../../pages/UserFormPage';
import { generateUserData, generateProductData } from '../../support/utils';

describe('Fluxos de Negócio Frontend — E2E', () => {
  let envEmail;
  let envPassword;

  before(() => {
    envEmail = Cypress.env('userEmail');
    envPassword = Cypress.env('userPassword');
  });

  describe('Cenário 1: Fluxos de Cadastro e Login', () => {
    let userToRegister;

    const adminUser = {
      nome: 'Admin QA Test',
      email: 'admin.core.qa@serverest.dev',
      password: 'teste',
      administrador: 'true'
    };

    beforeEach(() => {
      cy.apiLogin(envEmail, envPassword);
      cy.apiCleanupUser(adminUser.email);
    });

    after(() => {
      if (userToRegister) {
        cy.apiCleanupUser(userToRegister.email);
      }
      cy.apiCleanupUser(adminUser.email);
    });

    it('Então deve cadastrar um novo usuário com sucesso', () => {
      userToRegister = generateUserData(true);
      SignupPage.visit();
      SignupPage.fillForm(userToRegister);
      SignupPage.submit();
      SignupPage.assertSuccessMessage();

      HomePage.assertWelcomeMessage();
    });

    it('Então deve realizar login com sucesso usando credenciais válidas', () => {
      cy.apiCreateUser(adminUser);

      LoginPage.visit();
      LoginPage.fillCredentials(adminUser.email, adminUser.password);
      LoginPage.submit();
      LoginPage.assertRedirectedToHome();

      HomePage.assertWelcomeMessage();
      HomePage.navigateToListUsers();

      cy.url().should('include', '/admin/listarusuarios');
      HomePage.verifyUserInTable(adminUser);
    });
  });

  describe('Cenário 2: Fluxo de Criação de Produto (Admin)', () => {
    const newProduct = generateProductData();

    beforeEach(() => {
      cy.apiLogin(envEmail, envPassword);
      cy.visit('/admin/home');
    });

    afterEach(() => {
      cy.apiCleanupProduct(newProduct.nome);
    });

    it('Então deve criar um novo produto via dashboard admin', () => {
      HomePage.assertIsVisible();

      cy.intercept('POST', '**/produtos').as('postProduto');
      HomePage.clickCreateProduct();

      ProductFormPage.assertOnCreatePage();
      ProductFormPage.fillForm(newProduct);
      ProductFormPage.submit();

      cy.wait('@postProduto').its('response.statusCode').should('eq', 201);
      cy.screenshot('1-produto-criado-com-sucesso');

      HomePage.navigateToListProducts();

      cy.url().should('include', '/admin/listarprodutos');
      cy.screenshot('2-produto-listado-com-sucesso');

      HomePage.verifyProductInTable(newProduct);
    });
  });

  describe('Cenário 3: Fluxo de Criação de Usuário (Admin)', () => {
    const newUser = generateUserData(false);

    beforeEach(() => {
      cy.apiLogin(envEmail, envPassword);
      cy.visit('/admin/home');
    });

    afterEach(() => {
      cy.apiCleanupUser(newUser.email);
    });

    it('Então deve criar um novo usuário via dashboard admin e verificar na listagem', () => {
      HomePage.assertIsVisible();

      cy.intercept('POST', '**/usuarios').as('postUsuario');
      HomePage.clickCreateUser();

      UserFormPage.assertOnCreatePage();
      UserFormPage.fillForm(newUser);
      UserFormPage.submit();

      cy.wait('@postUsuario').its('response.statusCode').should('eq', 201);

      HomePage.navigateToListUsers();

      cy.url().should('include', '/admin/listarusuarios');

      HomePage.verifyUserInTable(newUser);
    });
  });
});
