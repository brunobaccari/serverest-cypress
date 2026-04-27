require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    env: {
      apiUrl: 'https://serverest.dev',
      userName: process.env.USER_NAME || 'Test User',
      userEmail: process.env.USER_EMAIL || '',
      userPassword: process.env.USER_PASSWORD || '',
      userAdmin: process.env.USER_ADMIN || 'true',
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: true,
  },
});
