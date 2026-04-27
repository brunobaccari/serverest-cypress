import { generateUserData, generateProductData } from '../../support/utils';

describe('Fluxos de Negócio via API', () => {
  let apiUrl;
  let envEmail;
  let envPassword;
  let authToken;

  before(() => {
    apiUrl = Cypress.env('apiUrl');
    envEmail = Cypress.env('userEmail');
    envPassword = Cypress.env('userPassword');

    cy.apiCreateUser({
      nome: Cypress.env('userName') || 'Admin User',
      email: envEmail,
      password: envPassword,
      administrador: Cypress.env('userAdmin') || 'true'
    });

    cy.getApiToken(envEmail, envPassword).then((token) => {
      authToken = token;
    });
  });

  describe('Cenário 1: Ciclo de Vida de Usuário', () => {
    it('Então deve criar, autenticar e deletar um usuário com sucesso', () => {
      const newUser = generateUserData(false);

      cy.request('POST', `${apiUrl}/usuarios`, newUser).then((res) => {
        expect(res.status, 'User creation should return 201').to.eq(201);
        expect(res.body.message, 'Success message should confirm registration').to.eq('Cadastro realizado com sucesso');
        expect(res.body, 'Response should include a user ID').to.have.property('_id').that.is.a('string');
        cy.wrap(res.body._id).as('createdUserId');
      });

      cy.request('POST', `${apiUrl}/login`, {
        email: newUser.email,
        password: newUser.password
      }).then((res) => {
        expect(res.status, 'Login should return 200').to.eq(200);
        expect(res.body.authorization, 'Token should follow Bearer format').to.match(/^Bearer /);
      });

      cy.get('@createdUserId').then((userId) => {
        cy.request('DELETE', `${apiUrl}/usuarios/${userId}`).then((res) => {
          expect(res.status, 'User deletion should return 200').to.eq(200);
          expect(res.body.message, 'Deletion message should confirm removal').to.eq('Registro excluído com sucesso');
        });
      });
    });
  });

  describe('Cenário 2: Cadastro e Validação de Produto', () => {
    it('Então deve rejeitar a criação de produto com um token inválido', () => {
      const newProduct = generateProductData();

      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: { Authorization: 'Bearer invalid_token_123' },
        body: newProduct,
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status, 'Invalid token should return 401').to.eq(401);
        expect(res.body.message, 'Error message should describe invalid token').to.eq(
          'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
        );
      });
    });

    it('Então deve criar um produto com um token admin válido', () => {
      const newProduct = generateProductData();

      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: { Authorization: authToken },
        body: newProduct
      }).then((res) => {
        expect(res.status, 'Product creation should return 201').to.eq(201);
        expect(res.body.message, 'Success message should confirm registration').to.eq('Cadastro realizado com sucesso');
        expect(res.body, 'Response should include a product ID').to.have.property('_id').that.is.a('string');

        cy.apiDeleteProduct(res.body._id, authToken);
      });
    });
  });

  describe('Cenário 3: Operações de Checkout de Carrinho', () => {
    const cartProduct = generateProductData();
    let cartProductId;

    before(() => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/produtos`,
        headers: { Authorization: authToken },
        body: cartProduct
      }).then((res) => {
        expect(res.status, 'Cart product setup should return 201').to.eq(201);
        cartProductId = res.body._id;
      });
    });

    after(() => {
      if (cartProductId) {
        cy.apiDeleteProduct(cartProductId, authToken);
      }
    });

    it('Então deve criar um carrinho e finalizar uma compra via API', () => {
      const initialStock = cartProduct.quantidade;

      cy.request({
        method: 'POST',
        url: `${apiUrl}/carrinhos`,
        headers: { Authorization: authToken },
        body: {
          produtos: [{ idProduto: cartProductId, quantidade: 1 }]
        }
      }).then((res) => {
        expect(res.status, 'Cart creation should return 201').to.eq(201);
        expect(res.body.message, 'Cart success message should confirm registration').to.eq('Cadastro realizado com sucesso');
        expect(res.body, 'Cart response should include an ID').to.have.property('_id').that.is.a('string');
      });

      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/carrinhos/concluir-compra`,
        headers: { Authorization: authToken }
      }).then((res) => {
        expect(res.status, 'Checkout should return 200').to.eq(200);
        expect(res.body.message, 'Checkout message should confirm deletion').to.eq('Registro excluído com sucesso');
      });

      cy.request('GET', `${apiUrl}/produtos/${cartProductId}`).then((res) => {
        expect(res.body.quantidade, 'Stock should be decremented by 1 after purchase').to.eq(initialStock - 1);
      });
    });
  });
});
