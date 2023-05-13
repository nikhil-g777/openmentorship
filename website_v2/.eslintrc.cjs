module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./website_v2/tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "react-refresh", "prettier"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-var-requires": 0,
  },
  ignorePatterns: ["tailwind.config.js"],
};
