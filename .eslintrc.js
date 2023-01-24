module.exports = {
  extends: [
    "eslint:recommended",
    'plugin:import/recommended',
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],
  ignorePatterns: ['.github'],
  root: true,
  env: {
    node: true,
  },
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
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'react/jsx-indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'quotes': ['error', 'double'],
    'quote-props': ['error', 'as-needed'],
  },
  settings: {
    react: {
      version: "detect",
    },
    'import/resolver': {
      typescript: true,
      node: {
        paths: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
