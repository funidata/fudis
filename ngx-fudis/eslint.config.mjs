import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["projects/ngx-fudis/coverage", "**/coverage", "**/dist", "**/static"],
  },
  ...compat.extends("eslint:recommended"),
  ...compat
    .extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:@angular-eslint/eslint-plugin/recommended",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts"],
    })),
  {
    files: ["**/*.ts"],
    rules: { "@angular-eslint/prefer-standalone": "off" },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  ...compat.extends("prettier").map((config) => ({
    ...config,
    files: ["**/transloco.config.js"],
  })),
  {
    files: ["**/transloco.config.js"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...compat
    .extends(
      "plugin:@angular-eslint/template/recommended",
      "plugin:@angular-eslint/template/accessibility",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.html"],
    })),
];
