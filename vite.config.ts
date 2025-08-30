import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about missing optional dependencies
        if (warning.code === 'MODULE_NOT_FOUND' && 
            warning.message.includes('@rollup/rollup-linux-x64-gnu')) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
