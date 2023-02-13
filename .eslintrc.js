module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true,
    "cypress/globals": true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier", "cypress"],
  rules: {
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
    eqeqeq: "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "no-console": 0,
    "react/prop-types": 0,
    "react/jsx-indent": [2, 2],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
