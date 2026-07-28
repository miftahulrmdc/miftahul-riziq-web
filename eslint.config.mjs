import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * ESLint 9 flat config.
 *
 * `eslint-config-next` is still published in the legacy .eslintrc format, so it
 * is bridged in through FlatCompat rather than imported directly.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

// Named rather than exported inline: the Next preset's import plugin flags an
// anonymous default export.
const config = [
  {
    // Build output and dependencies are generated — linting them is noise.
    ignores: [
      ".next/**",
      ".next-build/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Unused imports and variables are the class of problem that prompted
      // setting this up. Warn rather than error so a stale import never blocks
      // a build — but underscore-prefixed names stay exempt, which is the
      // conventional way to say "deliberately unused".
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
