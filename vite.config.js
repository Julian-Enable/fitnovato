import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2020",
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          data: ["./src/data/foods.js", "./src/data/exercises.js", "./src/data/lessons.js"]
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
