/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
    "cypress/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  globals: {
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "cypress"],
  rules: {
    eqeqeq: "error",
    "object-curly-spacing": ["error", "always"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": 0,
    "react/prop-types": 0,
    "react/jsx-indent": [2, 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/no-unescaped-entities": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
