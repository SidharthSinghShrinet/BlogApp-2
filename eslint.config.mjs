import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Core JS
      "no-unused-vars": "warn",
      "no-undef": "error",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      // "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-console": "off",

      // React
      "react/jsx-key": "error",
      "react/self-closing-comp": "warn",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",

      // Backend / async
      "no-shadow": "error",
      "require-await": "error",
      "no-return-await": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
