#!/usr/bin/env node

const { build } = require('esbuild');
const { copy } = require('fs-extra');
const path = require('path');

async function buildApp() {
  try {
    console.log('Building with esbuild...');
    
    // Build the main application
    await build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outdir: 'dist',
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
      },
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
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
