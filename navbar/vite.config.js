import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

const PORT = 8001;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
  },
  server: {
    port: PORT,
    cors: true,
  },
  preview: {
    port: PORT,
  },
  plugins: [
    vue(),
    federation({
      name: "navbar",
      filename: "navbar.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});