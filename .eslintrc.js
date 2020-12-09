module.exports = {
    root: true,
    extends: [
      "airbnb-typescript/base"
    ],
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: 6
    },
    env: {
        "es6": true
    },
    rules: {
      quotes: [2, "single"],
      'class-methods-use-this': 0
    },
  };
  