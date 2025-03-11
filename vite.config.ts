import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// @ts-ignore
import babelConfig from "./babel.config.cjs";

export default defineConfig({
  plugins: [react({ babel: babelConfig }), reactRouter(), tsconfigPaths()],
});
