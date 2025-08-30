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
    rollupOptions: {
      // Disable native modules to prevent platform-specific issues
      external: [],
      output: {
        manualChunks: undefined,
      },
    },
    // Ensure compatibility with Vercel's environment
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    // Force esbuild to handle dependencies
    esbuildOptions: {
      target: 'esnext',
    },
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  define: {
    // Ensure proper environment variable handling
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
