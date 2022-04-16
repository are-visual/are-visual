module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    __DEV__: true,
    JSX: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 0,
    'prefer-arrow-callback': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    ],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error'],
    camelcase: 0,
    'no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    'no-redeclare': 0,
    '@typescript-eslint/no-redeclare': [
      'error',
      { ignoreDeclarationMerge: true },
    ],
    '@typescript-eslint/no-var-requires': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'react/button-has-type': 0,
    'react/jsx-fragments': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-extraneous-dependencies': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: [
          'arrow-function',
          'function-declaration',
          'function-expression',
        ],
        unnamedComponents: [],
      },
    ],
    'react/jsx-key': [
      1,
      {
        checkFragmentShorthand: true,
        warnOnDuplicates: true,
      },
    ],
  },
}
