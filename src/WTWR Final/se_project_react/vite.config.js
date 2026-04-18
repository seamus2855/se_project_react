import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Add this proxy section
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Change to your actual backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3000,
  },
});
