/**
 * Obtains an authorization token via the ServeRest login API.
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Cypress.Chainable<string>} The authorization token
 */
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

/**
 * Authenticates via API and persists the token in localStorage using Cypress Sessions.
 * Stores token in Cypress.env('sessionToken') for DOM-free validation.
 * @param {string} email - User email
 * @param {string} password - User password
 */
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

/**
 * Creates a user via API. Silently succeeds if the email is already registered.
 * @param {object} userData - The payload to create a user
 */
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

/**
 * Deletes a user by ID via API.
 * @param {string} userId - The unique identifier of the user
 * @param {string} [token] - Optional authorization token
 */
Cypress.Commands.add('apiDeleteUser', (userId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/usuarios/${userId}`,
    headers: token ? { Authorization: token } : undefined
  });
});

/**
 * Creates a product via API. Requires authorization token.
 * @param {object} productData - Product payload
 * @param {string} token - Authorization token
 * @returns {Cypress.Chainable<string>} The product ID
 */
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

/**
 * Deletes a product via API.
 * @param {string} productId - The unique identifier of the product
 * @param {string} token - Authorization token
 */
Cypress.Commands.add('apiDeleteProduct', (productId, token) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/produtos/${productId}`,
    headers: { Authorization: token },
  });
});

/**
 * Ensures a user is deleted by searching for their email and deleting if found.
 * @param {string} email - The user's email to search for
 * @param {string} token - Authorization token
 */
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

/**
 * Ensures a product is deleted by searching for its name and deleting if found.
 * @param {string} nome - The product name to search for
 * @param {string} token - Authorization token
 */
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

/**
 * Cleans up a user by email using a fresh API token.
 * Does not depend on DOM state — safe for use in after() hooks.
 * @param {string} email - The user's email to delete
 */
Cypress.Commands.add('apiCleanupUser', (email) => {
  cy.getApiToken(
    Cypress.env('userEmail'),
    Cypress.env('userPassword')
  ).then((token) => {
    cy.apiEnsureUserDeletedByEmail(email, token);
  });
});

/**
 * Cleans up a product by name using a fresh API token.
 * Does not depend on DOM state — safe for use in after() hooks.
 * @param {string} nome - The product name to delete
 */
Cypress.Commands.add('apiCleanupProduct', (nome) => {
  cy.getApiToken(
    Cypress.env('userEmail'),
    Cypress.env('userPassword')
  ).then((token) => {
    cy.apiEnsureProductDeletedByName(nome, token);
  });
});
