module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  // update the extensions
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    //make it an error to use undersocres unless identifier is foo_ or _bar
  },
};