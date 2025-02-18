import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

// FlatCompat の設定
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname, // ⚠ Node.js 20.11.0 以上が必要
});

/**
 * ESLint 設定
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  //  適用するファイル
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },

  //  グローバル変数 (Browser / Node.js)
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  //  JavaScript の推奨設定
  pluginJs.configs.recommended,

  //  TypeScript のルール
  ...tseslint.configs.recommended,

  //  Next.js & Prettier の設定
  ...compat.config({
    extends: ["next", "prettier"],
    rules: {
      "@next/next/no-img-element": "off", // `next/image` を強制しない
      "react/no-unescaped-entities": "off", // JSX 内の未エスケープ文字の警告をオフ
    },
  }),
];

export default eslintConfig;
