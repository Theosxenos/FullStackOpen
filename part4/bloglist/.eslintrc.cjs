// .eslintrc.cjs
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    indent: ['error', 4], // Set 4 spaces for indentation
    'import/extensions': ['warn', 'ignorePackages', {
      'js': 'never',
      'mjs': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never'
    }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
