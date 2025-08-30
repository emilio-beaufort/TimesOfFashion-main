import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Only add lovable-tagger in development mode and only if explicitly requested
  if (mode === 'development' && process.env.ENABLE_LOVABLE_TAGGER === 'true') {
    try {
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    } catch (error) {
      // Silently ignore if lovable-tagger is not available
      console.warn("lovable-tagger not available for development");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Optimize for Vercel deployment
      rollupOptions: {
        external: ['lovable-tagger', '@rollup/rollup-linux-x64-gnu'],
        onwarn(warning, warn) {
          // Suppress warnings about missing optional dependencies
          if (warning.code === 'MODULE_NOT_FOUND' && 
              (warning.message.includes('@rollup/rollup-linux-x64-gnu') || 
               warning.message.includes('lovable-tagger'))) {
            return;
          }
          warn(warning);
        },
      },
      // Ensure proper chunking
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      exclude: ['lovable-tagger'],
    },
  };
});
