module.exports = {
  root: true,
  extends: [
    '@react-native',
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'unused-imports', '@akram'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@akram/style-object-same-line': ['error', 110],

    'import/extensions': ['error', { tsx: 'never', json: 'always' }],
    'import/prefer-default-export': 'off',
    indent: 'off',
    'max-len': 'off',
    'no-multiple-empty-lines': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-syntax': [
      'error',
      { selector: 'ExportDefaultDeclaration', message: 'Prefer named exports' },
    ],
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'always' }],
    'react-native/no-unused-styles': 'error',
    'unused-imports/no-unused-imports': 'error',
    'object-curly-newline': 'off',

    'prettier/prettier': [
      'error',
      {
        printWidth: 110,
        bracketSpacing: true,
        arrowParens: 'always',
        singleQuote: true,
        bracketSameLine: true,
        trailingComma: 'all',
      },
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'index', 'parent', 'sibling'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'react*(-native)', group: 'builtin' },
          { pattern: '{@Navigation,@Theme,@API}', group: 'index', position: 'before' },
          { pattern: '{@Atoms,@Molecules,@Pages}', group: 'index' },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
        'no-undef': 'off',
      },
    },
  ],
};
