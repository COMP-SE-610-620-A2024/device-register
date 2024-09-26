import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.config({
    extends: ["eslint:recommended"],
  }),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        module: 'readonly', // Define Node.js globals here
        require: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
  },
];
