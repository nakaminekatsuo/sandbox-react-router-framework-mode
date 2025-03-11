import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

// @ts-ignore
import babelConfig from "./babel.config.cjs";

export default defineConfig({
  plugins: [
    babel({ filter: /\.tsx?$/, babelConfig }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
