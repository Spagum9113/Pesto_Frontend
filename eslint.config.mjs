import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // your existing extends
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // add this object to override/disable rules
  {
    rules: {
      // turn off the “defined but never used” error
      "@typescript-eslint/no-unused-vars": "off",
      // turn off image element warning
      "@next/next/no-img-element": "off",
      // if you want to disable all linting entirely (not recommended):
      // "no-console": "off",
      // "eslint-disable": ["*"]
    },
  },
];

export default eslintConfig;
