import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Only add lovable-tagger in development mode
  if (mode === 'development') {
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
        external: mode === 'production' ? ['lovable-tagger'] : [],
        onwarn(warning, warn) {
          // Suppress warnings about missing optional dependencies
          if (warning.code === 'MODULE_NOT_FOUND' && warning.message.includes('@rollup/rollup-linux-x64-gnu')) {
            return;
          }
          warn(warning);
        },
      },
      // Ensure proper chunking
      chunkSizeWarningLimit: 1000,
    },
  };
});
