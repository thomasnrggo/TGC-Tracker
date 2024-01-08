module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    'vue',
  ],
  extends: [
    'plugin:prettier/recommended',
    "plugin:vue/base",
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    "ecmaVersion": 2020,
    "ecmaFeatures": {
       "jsx": true
    }
  },
  rules: {
    'vue/no-unused-vars': 'warn',
    'prettier/prettier': 'error',
  },
};
