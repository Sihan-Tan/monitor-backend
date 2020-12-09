module.exports = {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-transform-modules-commonjs"
  ],
}