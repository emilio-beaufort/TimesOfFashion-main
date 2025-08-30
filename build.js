import { build } from 'esbuild';
import { copy } from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildApp() {
  try {
    console.log('Building with esbuild...');
    
    // Build the main application
    await build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outdir: 'dist/assets',
      format: 'esm',
      target: 'esnext',
      minify: true,
      sourcemap: false,
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
        '.css': 'css',
        '.json': 'json',
      },
      define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'globalThis',
      },
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      jsx: 'automatic',
      jsxImportSource: 'react',
      external: [],
    });

    // Copy static assets
    await copy('public', 'dist', { overwrite: true });
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();
