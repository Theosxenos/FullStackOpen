// .eslintrc.cjs
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  rules: {
    indent: ['error', 4], // Set 4 spaces for indentation
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
