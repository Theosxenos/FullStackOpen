// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb',
  rules: {
    // indent: ['error', 4], // Set 4 spaces for indentation
    'import/extensions': ['warn', 'ignorePackages', {
      'js': 'never',
      'mjs': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never'
    }],
    'react/function-component-definition': 0
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
