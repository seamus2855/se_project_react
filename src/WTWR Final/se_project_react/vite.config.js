import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Any request starting with /api will be sent to the backend
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3000,
  },
});
