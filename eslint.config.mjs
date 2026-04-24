import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // — Style
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'no-console': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

      // — TypeScript
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: true },
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // — React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-spacing': [2, 'always'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-no-bind': 'error',
      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'parens-new-line',
      }],
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-tag-spacing': 'error',
      'react/prop-types': 'off',

      // — React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
