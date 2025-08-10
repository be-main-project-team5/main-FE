module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
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
    // 기타 커스텀 룰
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
};
