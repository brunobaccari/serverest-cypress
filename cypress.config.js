require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/junit-[hash].xml',
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    env: {
      apiUrl: 'https://serverest.dev',
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
