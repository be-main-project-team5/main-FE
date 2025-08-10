module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    ecmaFeatures: { jsx: true },
  },
  plugins: [
    'prettier',
    'react-refresh',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
};
