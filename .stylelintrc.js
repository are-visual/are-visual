module.exports = {
  root: true,
  plugins: ['stylelint-prettier', 'stylelint-order'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier'
  ],
  rules: {
    'function-name-case': ['lower', { ignoreFunctions: ['pxTransform'] }],
    'value-keyword-case': ['lower', { ignoreKeywords: ['state.searchBarWidth'] }],
    'prettier/prettier': [
      true,
      {
        parser: 'less',
      },
    ],
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["global"],
    }],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function',
          'tailwind',
          'layer',
          'apply',
        ],
      },
    ],
  },
}
