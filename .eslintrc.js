module.exports = {
  root: true,
  env: {
    node: true,
    'cypress/globals': true,
  },
  plugins: ['vue', 'cypress'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:cypress/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'vue/no-unused-vars': 'warn',
    'prettier/prettier': 'error',
  },
}
