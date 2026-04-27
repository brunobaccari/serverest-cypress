Cypress.Commands.add('getApiToken', (email, password) => {
  const loginUrl = `${Cypress.env('apiUrl')}/login`;

  cy.request({
    method: 'POST',
    url: loginUrl,
    body: { email, password },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Failed to authenticate in getApiToken: ${JSON.stringify(response.body)}`);
    }
    return cy.wrap(response.body.authorization);
  });
});

Cypress.Commands.add('apiLogin', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.apiCreateUser({
        nome: Cypress.env('userName') || 'Admin User',
        email: email,
        password: password,
        administrador: Cypress.env('userAdmin') || 'true'
      });

      cy.getApiToken(email, password).then((token) => {
        Cypress.env('sessionToken', token);
        cy.visit('/');
        cy.window().then((win) => {
          win.localStorage.setItem('serverest/userToken', token);
        });
      });
    },
    {
      validate() {
        const token = Cypress.env('sessionToken');
        expect(token).to.exist.and.to.not.be.empty;
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/usuarios`,
          headers: { Authorization: token },
          failOnStatusCode: false
        }).its('status').should('eq', 200);
      },
    }
  );
});

Cypress.Commands.add('apiCreateUser', (userData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: userData,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 400 && response.body && response.body.message === 'Este email já está sendo usado') {
      return cy.wrap(response.body);
    }
    if (response.status !== 201) {
      throw new Error(`Failed to create user: ${JSON.stringify(response.body)}`);
    }
  });
});

Cypress.Commands.add('apiDeleteUser', (userId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
    headers: token ? { Authorization: token } : undefined
  });
});

Cypress.Commands.add('apiCreateProduct', (productData, token) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/produtos`,
    headers: { Authorization: token },
    body: productData,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body._id;
  });
});

Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
    headers: { Authorization: token },
  });
});

Cypress.Commands.add('apiEnsureUserDeletedByEmail', (email, token) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    qs: { email }
  }).then((response) => {
    if (response.body.usuarios && response.body.usuarios.length > 0) {
      const userId = response.body.usuarios[0]._id;
      cy.apiDeleteUser(userId, token);
    }
  });
});

Cypress.Commands.add('apiEnsureProductDeletedByName', (nome, token) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/produtos`,
    qs: { nome }
  }).then((response) => {
    if (response.body.produtos && response.body.produtos.length > 0) {
      const productId = response.body.produtos[0]._id;
      cy.apiDeleteProduct(productId, token);
    }
  });
});

Cypress.Commands.add('apiCleanupUser', (email) => {
  cy.getApiToken(
    Cypress.env('userEmail'),
    Cypress.env('userPassword')
  ).then((token) => {
    cy.apiEnsureUserDeletedByEmail(email, token);
  });
});

Cypress.Commands.add('apiCleanupProduct', (nome) => {
  cy.getApiToken(
    Cypress.env('userEmail'),
    Cypress.env('userPassword')
  ).then((token) => {
    cy.apiEnsureProductDeletedByName(nome, token);
  });
});
