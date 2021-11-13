module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "node"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true, allowNullish: false },
    ],
    "@typescript-eslint/no-floating-promises": [
      "error",
      { ignoreVoid: false, ignoreIIFE: false },
    ],
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/unbound-method": "error",
    "no-console": "error",
    "no-debugger": "error",
    "node/no-process-env": "error",
  },
};
