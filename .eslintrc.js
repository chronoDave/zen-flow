module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // TypeScript
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    // General
    'operator-linebreak': ['error', 'after'],
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'no-confusing-arrow': 'off',
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'no-nested-ternary': 'off',
    'object-property-newline': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'warn',
    'no-await-in-loop': 'off',
    'object-curly-newline': ['warn', {
      ObjectPattern: { minProperties: 4 },
      ImportDeclaration: { minProperties: 4 }
    }],
    // Import
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      'newlines-between': 'always-and-inside-groups',
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ]
    }]
  }
};
