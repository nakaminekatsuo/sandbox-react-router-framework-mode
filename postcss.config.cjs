const babelConfig = require("./babel.config.cjs");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["app/**/*.{js,jsx,ts,tsx}"],
      useCSSLayers: true,
      babelConfig,
    },
    autoprefixer: {},
  },
};
