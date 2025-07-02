import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import commentsPlugin from "eslint-plugin-eslint-comments";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    ignores: [
      "**/*.gql.ts",
      "**/__generated__/**",
      "**/service/gql/**",
      "scripts/**",
      "prisma/**",
      "node_modules/**",
    ],
  },

  ...compat.extends(
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:prettier/recommended",
  ),

  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      },
    },
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "eslint-comments": commentsPlugin,
    },
  },

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "prettier/prettier": ["error"],
      curly: ["error", "all"],
      eqeqeq: ["error", "smart"],
      "no-void": ["error", { allowAsStatement: true }],
      "prefer-regex-literals": ["error", { disallowRedundantWrapping: false }],
      "no-console": "off",

      "import/extensions": [
        "error",
        "never",
        { json: "always", svg: "always", css: "always" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["block-like", "return", "class"],
        },
        {
          blankLine: "always",
          prev: ["block-like", "return", "class"],
          next: "*",
        },
        { blankLine: "any", prev: "default", next: "case" },
      ],
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "eslint-comments": commentsPlugin,
    },
    rules: {
      // JS-equivalent base rules
      curly: ["error", "all"],
      eqeqeq: ["error", "smart"],
      "no-void": ["error", { allowAsStatement: true }],
      "no-console": "off",
      "import/extensions": [
        "error",
        "never",
        { json: "always", svg: "always", css: "always" },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: ["block-like", "return", "class"],
        },
        {
          blankLine: "always",
          prev: ["block-like", "return", "class"],
          next: "*",
        },
        { blankLine: "any", prev: "default", next: "case" },
      ],

      // TypeScript-specific rules
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],
      "@typescript-eslint/await-thenable": "error",

      // Opt-outs
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unsafe-*": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
];
