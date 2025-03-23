import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    checker({}),
    babel({ filter: /\.tsx?$/ }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
