module.exports = [
  {
    languageOptions: {
      globals: {
        node: true,
      },
    },
    rules: {
      // Your custom rules here
    },
  },
  {
    // eslint:recommended config
    env: {
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
    },
  },
];
