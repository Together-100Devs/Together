import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import IstanbulPlugin from "vite-plugin-istanbul";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    IstanbulPlugin({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:2121",
    },
  },
});
