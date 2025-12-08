import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,   // run dev server on port 3000
    open: true,   // auto-open browser when you run `npm run dev`
  },
  preview: {
    port: 3000,   // also use port 3000 for `npm run preview`
  },
});
