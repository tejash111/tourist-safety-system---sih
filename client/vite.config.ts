import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
  port: 3001, 
  open: true,
  proxy: {
    '/api': {
      target: "http://localhost:3000", 
      changeOrigin: true,
    },
  },
}

});
