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

    it('Então deve exibir erros de validação ao submeter login sem preencher os campos', () => {
      cy.window().then((win) => win.localStorage.clear());
      LoginPage.visit();
      LoginPage.submit();
      LoginPage.assertValidationErrors(['Email é obrigatório', 'Password é obrigatório']);
    });

    it('Então deve exibir erros de validação ao submeter cadastro sem preencher os campos', () => {
      cy.window().then((win) => win.localStorage.clear());
      SignupPage.visit();
      SignupPage.submit();
      SignupPage.assertValidationErrors([
        'Nome é obrigatório',
        'Email é obrigatório',
        'Password é obrigatório'
      ]);
    });

    it('Então deve exibir erro ao tentar login com credenciais inválidas', () => {
      const fakeUser = generateUserData();
      cy.window().then((win) => win.localStorage.clear());
      LoginPage.visit();
      LoginPage.fillCredentials(fakeUser.email, fakeUser.password);
      LoginPage.submit();
      LoginPage.assertValidationErrors(['Email e/ou senha inválidos']);
    });

    it('Então deve cadastrar um novo usuário com sucesso', () => {
      userToRegister = generateUserData(true);
      SignupPage.visit();
      SignupPage.fillForm(userToRegister);
      SignupPage.submit();
      SignupPage.assertSuccessMessage();

      cy.url().should('include', '/admin/home');
      HomePage.assertWelcomeMessage();
      cy.contains(userToRegister.nome).should('be.visible');
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
    const productWithoutImage = generateProductData();
    const productWithImage = { ...generateProductData(), imagem: true };

    beforeEach(() => {
      cy.apiLogin(envEmail, envPassword);
      cy.visit('/admin/home');
    });

    afterEach(() => {
      cy.apiCleanupProduct(productWithoutImage.nome);
      cy.apiCleanupProduct(productWithImage.nome);
    });

    it('Então deve criar um produto sem imagem e verificar coluna vazia na listagem', () => {
      HomePage.assertIsVisible();

      cy.intercept('POST', '**/produtos').as('postProduto');
      HomePage.clickCreateProduct();

      ProductFormPage.assertOnCreatePage();
      ProductFormPage.fillForm(productWithoutImage);
      ProductFormPage.submit();

      cy.wait('@postProduto')
        .its('response.statusCode')
        .should('eq', 201);

      HomePage.navigateToListProducts();
      cy.url().should('include', '/admin/listarprodutos');
      HomePage.verifyProductInTable(productWithoutImage);
    });

    it('Então deve criar um produto com imagem e verificar fakepath na listagem', () => {
      HomePage.assertIsVisible();

      cy.intercept('POST', '**/produtos').as('postProduto');
      HomePage.clickCreateProduct();

      ProductFormPage.assertOnCreatePage();
      ProductFormPage.fillForm(productWithImage);
      ProductFormPage.submit();

      cy.wait('@postProduto')
        .its('response.statusCode')
        .should('eq', 201);

      HomePage.navigateToListProducts();
      cy.url().should('include', '/admin/listarprodutos');
      cy.screenshot('produto-com-imagem-listado');
      HomePage.verifyProductInTable(productWithImage);
    });

    it('Então deve excluir um produto e verificar que não aparece mais na listagem', () => {
      const productToDelete = generateProductData();

      HomePage.assertIsVisible();

      cy.intercept('POST', '**/produtos').as('postProduto');
      HomePage.clickCreateProduct();

      ProductFormPage.assertOnCreatePage();
      ProductFormPage.fillForm(productToDelete);
      ProductFormPage.submit();

      cy.wait('@postProduto')
        .its('response.statusCode')
        .should('eq', 201);

      HomePage.navigateToListProducts();
      cy.url().should('include', '/admin/listarprodutos');
      HomePage.verifyProductInTable(productToDelete);

      HomePage.deleteProductFromTable(productToDelete.nome);

      HomePage.verifyProductNotInTable(productToDelete.nome);
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

      cy.wait('@postUsuario')
        .its('response.statusCode')
        .should('eq', 201);

      cy.url().should('include', '/admin/listarusuarios');

      HomePage.verifyUserInTable(newUser);
    });
  });
});
