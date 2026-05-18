import { Linter } from 'eslint';
import * as typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error Package does not ship TypeScript declarations.
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
// @ts-expect-error Package does not ship TypeScript declarations.
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
// @ts-expect-error Package does not ship TypeScript declarations.
import * as importPlugin from 'eslint-plugin-import';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';

const isCi = process.env.NODE_ENV === 'ci';

const ignores = [
  'dist',
  'public',
  'eslint.config.ts',
  '*.config.ts',
  '*.config.mts',
  '**/*.schema.ts',
];

const config: Linter.Config[] = [
  prettierPluginRecommended,
  {
    ignores,
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      //@ts-ignore
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      //@ts-ignore
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'unused-imports': unusedImportsPlugin,
      //@ts-ignore
      import: importPlugin,
      //@ts-ignore
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      'no-console': isCi ? 'error' : 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['warn', 'always'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': 'error',
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['src/app/routes/**/*'],
    rules: {
      'react-refresh/only-export-components': 0,
    },
  },
];

export default config;
