const path = require("path");

module.exports = {
  presets: ["@babel/preset-typescript"],
  plugins: [
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
