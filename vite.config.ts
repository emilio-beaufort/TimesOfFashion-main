import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Completely bypass Rollup and use esbuild
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Disable Rollup entirely
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
      },
    },
    // Force esbuild bundling
    lib: undefined,
    ssr: false,
  },
  optimizeDeps: {
    // Force esbuild to handle dependencies
    esbuildOptions: {
      target: 'esnext',
      platform: 'browser',
    },
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: ['@rollup/rollup-linux-x64-gnu'],
  },
  define: {
    // Ensure proper environment variable handling
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  // Disable Rollup completely
  esbuild: {
    target: 'esnext',
  },
}));
