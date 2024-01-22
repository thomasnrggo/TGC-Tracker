const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      TEST_USER_USERNAME: 'testuser',
      TEST_USER_EMAIL: 'testuser@example.com',
      TEST_USER_PASSWORD: 'password',
    },
  },

  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack',
    },
  },
})
