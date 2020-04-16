module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  ],
  rules: {
    'semi': [2, 'never'],
    'no-prototype-builtins': 0,
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
  },
}
