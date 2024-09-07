import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { fileURLToPath, URL } from "node:url";

const PORT = 8002;

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
    react(),
    federation({
      name: "auth",
      filename: "auth.js",
      exposes: {
        './App': './src/App.jsx', // Ensure this path is correct
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
