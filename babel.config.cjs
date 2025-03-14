const path = require("path");

module.exports = {
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: [
    ["@babel/plugin-syntax-typescript", { isTSX: true }],
    [
      "@stylexjs/babel-plugin",
      {
        aliases: {
          "~/*": [path.join(__dirname, "./app/*")],
        },
        dev: process.env.NODE_ENV === "development",
        test: process.env.NODE_ENV === "test",
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: "commonJS",
        },
      },
    ],
  ],
};
