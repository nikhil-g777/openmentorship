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
    project: "tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["react", "@typescript-eslint", "react-refresh", "prettier"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-var-requires": 0,
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": ["function-declaration", "arrow-function"],
        "unnamedComponents": ["function-expression", "arrow-function"]
      }
    ]
  },
  ignorePatterns: ["tailwind.config.js"],
};
