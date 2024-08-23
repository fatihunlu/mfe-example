import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

const PORT = 8000;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: false,
    target: "esnext",
  },
  server: {
    port: PORT,
  },
  preview: {
    port: PORT,
    cors: true,
  },
  plugins: [
    vue(),
    federation({
      name: "container",
      remotes: {
        navbar: "http://localhost:8001/assets/navbar.js"
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