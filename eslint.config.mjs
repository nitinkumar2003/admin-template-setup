// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;


import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
export default [
  // ▒~\~E Next.js + TypeScript recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ▒~\~E Your custom overrides
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      // allow `any` type without errors
      "@typescript-eslint/no-explicit-any": "off",

      // keep other checks if you want
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // disable apostrophe warning
      "react/no-unescaped-entities": "off"
    }
  }
];

