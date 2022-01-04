module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    es2020: true, /*For BigInt, see task '02-number-tasks getAverage()'*/
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
