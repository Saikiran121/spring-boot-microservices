// eslint.config.js
module.exports = [
  {
    languageOptions: {
      globals: {
        node: true,
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    rules: {
      // Your custom rules here
      'no-console': 'off',
      'no-debugger': 'off',
    },
  },
  {
    // This section is not needed in flat config. 
    // You can move the rules into the previous section.
  },
];

